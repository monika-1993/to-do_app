import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { exhaustMap, map, mergeMap, catchError } from 'rxjs/operators';

import { TaskService } from './services/task.service';
import { AppState } from './app.state';
import * as TodoActions from './actions';

@Injectable()
export class TodoEffects {

  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private service: TaskService
  ) { }

  @Effect()
  public init$ = this.action$
    .ofType(TodoActions.LOAD_TASK)
    .pipe(
      mergeMap(action => {
        return Observable.of(this.service.getTasks()).pipe(
          map(res => {
            return new TodoActions.LoadTaskSuccessful(res);
          }),
          catchError(error => Observable.of(new TodoActions.LoadTaskFailed())));
      }
      )
    );

}
