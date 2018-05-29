import { Task } from './types';
import { Action as RxAction } from '@ngrx/store';

export interface NewTask {
  name: string;
  description?: string;
  priority?: Priority;
}

export interface Task extends NewTask {
  subtasks: Task[];
  isEditing?: boolean;
  isShowingSubtasks?: boolean;
  _id?: any;
  lastUpdated: Date;
  isCompleted: boolean;
}

export enum Priority {
  high = 'High',
  medium = 'Medium',
  low = 'Low'
}

export enum TaskType {
  task = 'task',
  subtask = 'subtask'
}

export enum SortOptions {
  nameAscending,
  nameDescending,
  priorityAscending,
  priorityDescending
}

export interface ActionCustom extends RxAction {
  payload: any;
}
