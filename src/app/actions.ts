import { Action } from '@ngrx/store';
import { Task } from './types';

export const ADD_TASK = 'ADD_TASK';
export class addTask implements Action {
  readonly type = ADD_TASK
  constructor(public payload: Task) {}
}

export type Actions = addTask;