import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Task } from '../../types';
import { AppState } from '../../app.state';
import { ADD_TASK } from '../../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public taskState: Observable<any>;
  public tasks:Task[];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.taskState = this.store.select('tasks');
    this.taskState.subscribe(t=>this.tasks=t.tasks);
  }

  onAdd(payload: Task) {
    this.store.dispatch({
      type:ADD_TASK,
      payload
    });
    console.log(this.tasks);
  }

}
