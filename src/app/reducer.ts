import { Action } from '@ngrx/store';

import { Task } from './types';
import * as ToDoActions from './actions';
import { AppState } from './app.state';

// const initialState: AppState = { tasks: [] };
const initialState = {
  tasks: [{
    id: 1,
    description: 'desc',
    name: 'task-1',
    isCompleted: true,
    lastUpdated: new Date(),
    priority: 'high',
    subtasks: []
  }]
};
export function reducer(state: AppState = initialState, action: ToDoActions.Actions) {

  switch (action.type) {
    case ToDoActions.ADD_TASK:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}