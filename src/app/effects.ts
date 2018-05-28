import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tap, map, catchError, switchMap } from 'rxjs/operators';


import { TaskService } from './services/task.service';
import { AppState } from './app.state';
import * as TodoActions from './actions';
import { Task, ActionCustom } from './types';

@Injectable()
export class TodoEffects {

  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private service: TaskService
  ) { }

  @Effect()
  public load$ = this.action$
    .ofType(TodoActions.LOAD_TASK)
    .pipe(
      switchMap(() => {
        return this.service.getTasks().pipe(
          map(tasks => {
            return new TodoActions.LoadTaskSuccessful(tasks);
          }),
        );
      })
    );

  @Effect()
  public add$ = this.action$
    .ofType(TodoActions.ADD_TASK)
    .pipe(
      switchMap((action) => {
        return this.service.addTask(removeBeforePost(action.payload)).pipe(
          map(response => {
            return new TodoActions.AddTaskSuccessful(response.task);
          }),
        );
      })
    );
  @Effect()
  public update$ = this.action$
    .ofType(TodoActions.UPDATE_TASK)
    .pipe(
      switchMap(action => {
        return this.service.updateTask(removeBeforePost(action.payload)).pipe(
          map(response => {
            if (response) {
              console.log(response,'res');
              return new TodoActions.UpdateTaskSuccessful(response);
            }
          }),
        );
      })
    );

  @Effect()
  public delete$ = this.action$
    .ofType(TodoActions.DELETE_TASK)
    .pipe(
      switchMap(action => {
        return this.service.deleteTask(action.payload).pipe(
          map(response => {
            return new TodoActions.DeleteTaskSuccessful(response.id);
          }),
        );
      })
    );

}

const removeBeforePost = (task: Task): Task => {
  return {
    ...task,
    isEditing: null,
    isShowingSubtasks: null
  };
};
