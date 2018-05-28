import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task, Priority } from '../../types';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() serialNumber: number;
  @Input() task: Task;
  @Output() taskChange = new EventEmitter<Task>();
  @Output() onSave = new EventEmitter<Task>();
  @Output() onCancelEdit = new EventEmitter<Task>();

  public priority = Priority;

  public onSaveEdited() {
    this.onSave.emit(this.task);
  }

  public onEdit() {
    this.taskChange.emit(this.task);
  }

  public onCancel() {
    console.log('cncel');
    this.onCancelEdit.emit(this.task);
  }
}
