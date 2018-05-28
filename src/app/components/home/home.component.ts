import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Task, Priority } from '../../types';
import { AppState } from '../../app.state';
import * as TodoActions from '../../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public taskId: string;
  public taskState: Observable<any>;
  public tasks: Task[];
  public priority = Priority;
  public isSubtask: boolean = this.taskId ? true : false;
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

    // this.route.params.take(1).subscribe(param => this.taskId = param.id);
    // this.taskState = this.store.select(s => s.tasks);
    // this.taskState.subscribe(t => {
    //   this.tasks = this.taskId ? t.tasks.filter(tas => tas._id === this.taskId).map(task => task.subtasks)[0] : t;
    //   console.log(this.taskId, t, this.tasks);
    // }
    // );

  }

  onAdd(payload: Task) {
    this.store.dispatch({
      type: TodoActions.ADD_TASK,
      payload
    });
    console.log(this.tasks);
  }

  onSaveEdited(payload: Task) {
    this.store.dispatch({
      type: TodoActions.UPDATE_TASK,
      payload
    });
    console.log(this.tasks);
  }

  onDelete(payload: string) {
    this.store.dispatch({
      type: TodoActions.DELETE_TASK,
      payload
    });
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
  }
}
