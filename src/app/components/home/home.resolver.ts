import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



import { TaskService } from '../../services/task.service';
import { LoadTask } from './../../actions';
import { Task } from '../../types';

@Injectable()
export class HomeResolver implements Resolve<Observable<Task[]>> {
  public taskId: string;
  constructor(
    private store: Store<AppState>,
  ) { }
  resolve() {
    return Observable.of(this.store.dispatch(new LoadTask()))
      .mergeMap(() =>
        this.store
          .take(1)
          .map(() => {
            return this.store.select('tasks');
          }));
  }
}
