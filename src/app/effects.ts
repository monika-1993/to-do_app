import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tap, map, catchError, switchMap, combineLatest } from 'rxjs/operators';


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
            if (tasks) {
              return new TodoActions.LoadTaskSuccessful(tasks);
            } else {
              alert('Sorry, your tasks could not be updated. Try again !');
              return new TodoActions.LoadTaskFailed();
            }
          }),
        );
      })
    );

  @Effect()
  public add$ = this.action$
    .ofType(TodoActions.ADD_TASK)
    .pipe(
      switchMap((action) => {
        return this.service.addTask(removeBeforePost((action as ActionCustom).payload)).pipe(
          map(response => {
            if (response) {
              return new TodoActions.AddTaskSuccessful((response as any).task);
            } else {
              alert('Sorry, your tasks could not be updated. Try again !');
              return new TodoActions.AddTaskFailed();
            }
          }),
        );
      })
    );
  @Effect()
  public update$ = this.action$
    .ofType(TodoActions.UPDATE_TASK)
    .pipe(
      switchMap(action => {
        return this.service.updateTask(removeBeforePost((action as ActionCustom).payload.task),
          (action as ActionCustom).payload.type).pipe(
            map(response => {
              if (response) {
                return new TodoActions.UpdateTaskSuccessful(response);
              } else {
                alert('Sorry, your tasks could not be updated. Try again !');
                return new TodoActions.UpdateTaskFailed();
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
        return this.service.deleteTask((action as ActionCustom).payload).pipe(
          map(response => {
            return new TodoActions.DeleteTaskSuccessful((response as any).id);
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
