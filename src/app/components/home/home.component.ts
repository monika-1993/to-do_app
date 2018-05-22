import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Task } from '../../types';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public taskState: Observable<Task[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.taskState = this.store.select('tasks');
  }

}
