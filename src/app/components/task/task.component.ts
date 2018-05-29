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
    this.onClickEdit.emit(this.taskToDisplay);
  }

  public onDeleteEmit() {
    this.onDelete.emit(this.taskToDisplay._id);
  }

  public onChangeStatusEmit() {
    if (this.taskToDisplay.subtasks.length) {
      const incompleteSubtask = this.taskToDisplay.subtasks.find(s => s.isCompleted === false);
      if (incompleteSubtask) {
        alert('You cannot mark a task as complete till all subtasks are done');
        return;
      }
    }
    this.onChangeStatus.emit(this.taskToDisplay);
  }

}
