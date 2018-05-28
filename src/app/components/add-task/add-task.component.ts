import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NewTask, Priority } from '../../types';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() public onTaskAdd: EventEmitter<NewTask> = new EventEmitter();

  public task: NewTask;
  public priority = Priority;

  constructor() {
    this.task = dummy;
  }

  public onAddingTask(task: NewTask) {
    this.onTaskAdd.emit(this.task);
    this.task = dummy;
  }

}

const dummy = {
  name: '',
  description: '',
  priority: null,
};


