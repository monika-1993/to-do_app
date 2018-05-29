import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';



import { TaskService } from '../../services/task.service';
import { LoadTask } from './../../actions';
import { Task } from '../../types';

@Injectable()
export class HomeResolver implements Resolve<Observable<Task[]>> {
  public taskId: string;
  constructor(
    private store: Store<AppState>,
    private route: Router
  ) { }
  resolve() {
    console.log(this.route.routerState, 'sn');
    // this.route.events.subscribe(val => {

    //   if (val instanceof RoutesRecognized) {

    //       console.log(val.state.root.firstChild.params);

    //   }
    // });
    // this.route.paramMap.params.subscribe(param => {
    //   console.log(param, 'id');
    //   return this.taskId = param.id;
    // });
    return Observable.of(this.store.dispatch(new LoadTask()))
      .mergeMap(() =>
        this.store
          .take(1)
          .map(() => {
            // console.log(this.route.routerState, 'sn');
            return this.store.select('tasks');
          }));
  }
}
