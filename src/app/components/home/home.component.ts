import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { sortBy, reverse, cloneDeep, includes } from 'lodash';

import { Task, Priority, TaskType, SortOptions } from '../../types';
import { AppState } from '../../app.state';
import * as TodoActions from '../../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sort = SortOptions;
  public taskId: string;
  public taskState: Observable<any>;
  public tasks: Task[];
  public initialTasks: Task[];
  public priority = Priority;
  public isSubtask: boolean = this.taskId ? true : false;
  public taskType: TaskType;
  public parentTask: Task;
  public currentTask: Task = {
    name: '',
    isCompleted: false,
    lastUpdated: null,
    description: '',
    priority: Priority.high,
    subtasks: []
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskState = this.store.select(s => s.tasks);
    this.taskState.subscribe(t => {
      console.log(t);
    });

    this.route.params.subscribe(param => {
      this.taskId = param.id;
      this.taskType = this.taskId === 'all' ? TaskType.task : TaskType.subtask;
      this.taskState = this.store.select(s => s.tasks);
      this.taskState.subscribe(t => {
        if (param.id !== 'all') {
          this.parentTask = (t.tasks.filter(tas => tas._id === param.id)[0] as Task);
          this.tasks = this.parentTask ? this.parentTask.subtasks : [];
        } else {
          this.tasks = t.tasks;
        }
        this.initialTasks = cloneDeep(this.tasks);
        this.taskId = param.id;
      }
      );
    });

  }

  onAdd(payload: Task) {
    switch (this.taskType) {
      case (TaskType.task):
        this.store.dispatch({
          type: TodoActions.ADD_TASK,
          payload
        });
        break;
      case (TaskType.subtask): {
        this.parentTask.subtasks.push(payload);
        this.store.dispatch({
          type: TodoActions.UPDATE_TASK,
          payload: { task: this.parentTask, type: TaskType.subtask }
        });
        break;
      }
    }
  }

  onSaveEdited(payload: Task) {
    switch (this.taskType) {
      case (TaskType.task):
        this.store.dispatch({
          type: TodoActions.UPDATE_TASK,
          payload: { task: payload, type: TaskType.task }
        });
        break;
      case (TaskType.subtask): {
        const subtasks = this.parentTask.subtasks.filter(t => t._id !== payload._id);
        this.store.dispatch({
          type: TodoActions.UPDATE_TASK,
          payload: { task: { ...this.parentTask, subtasks: [...subtasks, payload] }, type: TaskType.subtask }
        });
        break;
      }
    }
    console.log(this.tasks);
  }

  onDelete(payload: string) {
    switch (this.taskType) {
      case (TaskType.task):
        this.store.dispatch({
          type: TodoActions.DELETE_TASK,
          payload
        });
        break;
      case (TaskType.subtask): {
        this.store.dispatch({
          type: TodoActions.UPDATE_TASK,
          payload: {
            task: {
              ...this.parentTask,
              subtasks: this.parentTask.subtasks.filter(t => t._id !== payload)
            }, type: TaskType.subtask
          }
        });
        break;
      }
    }

    console.log(this.tasks);
  }

  onEdit(task: Task) {
    console.log('is editi');
    task.isEditing = true;
  }

  onCancelEdit(task: Task) {
    task.isEditing = false;
  }

  onSave(task: Task) {
    task.isEditing = false;
    this.onSaveEdited(task);
  }

  onSort(sortOption: SortOptions) {
    console.log('in sort', SortOptions.nameAscending, sortOption);
    switch (+sortOption) {
      case (SortOptions.nameAscending):
        this.tasks = sortBy(this.tasks, (task) => task.name);
        break;
      case (SortOptions.nameDescending):
        this.tasks = reverse(sortBy(this.tasks, (task) => task.name));
        break;
      case (SortOptions.priorityAscending):
        this.tasks = sortBy(this.tasks, (task) => RANK_PRIORITY[task.priority]);
        break;
      case (SortOptions.priorityDescending):
        this.tasks = reverse(sortBy(this.tasks, (task) => RANK_PRIORITY[task.priority]));
        break;
    }
  }

  onSearch(text: string) {
    this.tasks = this.tasks.filter(task => includes(task.name, text));
  }

  onSearchCancel() {
    this.tasks = this.initialTasks;
  }
}

const RANK_PRIORITY = {
  [Priority.high]: 1,
  [Priority.medium]: 2,
  [Priority.low]: 3,
};
