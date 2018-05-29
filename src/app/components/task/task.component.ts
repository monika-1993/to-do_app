import { Task } from './../../types';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() taskToDisplay: Task;
  @Input() serialNumber: number;
  @Output() onClickEdit = new EventEmitter<Task>();
  @Output() onViewSubtask = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onChangeStatus = new EventEmitter<Task>();

  public onClickEditEmit() {
    console.log(this.taskToDisplay);
    this.onClickEdit.emit(this.taskToDisplay);
  }

  // public onViewSubtaskEmit() {
  //   this.store.go
  // }

  public onDeleteEmit() {
    this.onDelete.emit(this.taskToDisplay._id);
  }

  public onChangeStatusEmit() {
    this.onChangeStatus.emit(this.taskToDisplay);
  }

}
