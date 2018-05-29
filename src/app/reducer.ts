import { Action } from '@ngrx/store';

import { Task, Priority } from './types';
import * as ToDoActions from './actions';
import { AppState } from './app.state';

const initialState = {
  tasks: [],
  isLoading: false
};
export function reducer(state: AppState = initialState, action: ToDoActions.Actions) {

  switch (action.type) {
    case ToDoActions.LOAD_TASK_SUCCESSFUL:
      return { ...state, tasks: action.payload, isLoading: false };
    case ToDoActions.ADD_TASK_SUCCESSFUL:
      return { ...state, isLoading: false, tasks: [...state.tasks, action.payload] };
    case ToDoActions.DELETE_TASK_SUCCESSFUL:
      return { ...state, isLoading: false, tasks: state.tasks.filter(t => t._id !== action.payload) };
    case ToDoActions.UPDATE_TASK_SUCCESSFUL:
      return { ...state, isLoading: false, tasks: [...state.tasks.filter(t => t._id !== action.payload._id), action.payload] };
    case ToDoActions.LOAD_TASK:
      return { ...state, isLoading: true };
    case ToDoActions.LOAD_TASK_FAILED:
      return { ...state, isLoading: false };
    case ToDoActions.ADD_TASK:
      return { ...state, isLoading: true };
    case ToDoActions.ADD_TASK_FAILED:
      return { ...state, isLoading: false };
      case ToDoActions.UPDATE_TASK:
      return { ...state, isLoading: true };
    case ToDoActions.UPDATE_TASK_FAILED:
      return { ...state, isLoading: false };
    case ToDoActions.DELETE_TASK:
      return { ...state, isLoading: true };
    case ToDoActions.DELETE_TASK_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
