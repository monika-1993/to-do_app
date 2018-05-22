import { Action } from '@ngrx/store';

import { Task, Priority } from './types';
import * as ToDoActions from './actions';
import { AppState } from './app.state';

// const initialState: AppState = { tasks: [] };
const initialState = {
  tasks: []
};
export function reducer(state: AppState = initialState, action: ToDoActions.Actions) {

  switch (action.type) {
    case ToDoActions.LOAD_TASK_SUCCESSFUL:
      return { ...state, tasks:  action.payload };
    case ToDoActions.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ToDoActions.DELETE_TASK_SUCCESSFUL:
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case ToDoActions.UPDATE_TASK_SUCCESSFUL:
      return { ...state, tasks: [...state.tasks.filter(t => t.id !== action.payload.id), action.payload] };
    default:
      return state;
  }
}
