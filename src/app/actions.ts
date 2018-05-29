import { Action } from '@ngrx/store';
import { Task, TaskType } from './types';

export const LOAD_TASK = 'LOAD_TASK';
export class LoadTask implements Action {
  readonly type = LOAD_TASK;
  constructor() { }
}

export const LOAD_TASK_SUCCESSFUL = 'LOAD_TASK_SUCCESSFUL';
export class LoadTaskSuccessful implements Action {
  readonly type = LOAD_TASK_SUCCESSFUL;
  constructor(public payload: any) { }
}
export const LOAD_TASK_FAILED = 'LOAD_TASK_FAILED';
export class LoadTaskFailed implements Action {
  readonly type = LOAD_TASK_FAILED;
  constructor() { }
}

export const ADD_TASK = 'ADD_TASK';
export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: Task) { }
}
export const ADD_TASK_SUCCESSFUL = 'ADD_TASK_SUCCESSFUL';
export class AddTaskSuccessful implements Action {
  readonly type = ADD_TASK_SUCCESSFUL;
  constructor(public payload: any) { }
}
export const ADD_TASK_FAILED = 'ADD_TASK_FAILED';
export class AddTaskFailed implements Action {
  readonly type = ADD_TASK_FAILED;
  constructor() { }
}

export const UPDATE_TASK = 'UPDATE_TASK';
export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: {
    task: Task,
    type: TaskType
  }) { }
}

export const UPDATE_TASK_SUCCESSFUL = 'UPDATE_TASK_SUCCESSFUL';
export class UpdateTaskSuccessful implements Action {
  readonly type = UPDATE_TASK_SUCCESSFUL;
  constructor(public payload: any) { }
}

export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';
export class UpdateTaskFailed implements Action {
  readonly type = UPDATE_TASK_FAILED;
  constructor() { }
}

export const DELETE_TASK = 'DELETE_TASK';
export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: number) { }
}

export const DELETE_TASK_SUCCESSFUL = 'DELETE_TASK_SUCCESSFUL';
export class DeleteTaskSuccessful implements Action {
  readonly type = DELETE_TASK_SUCCESSFUL;
  constructor(public payload: number) { }
}

export const DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';
export class DeleteTaskFailed implements Action {
  readonly type = DELETE_TASK_FAILED;
  constructor() { }
}

export type Actions = 
LoadTask| LoadTaskFailed| AddTask | AddTaskFailed | UpdateTaskFailed| DeleteTaskFailed|
LoadTaskSuccessful | AddTaskSuccessful | UpdateTask | DeleteTask | UpdateTaskSuccessful | DeleteTaskSuccessful;
