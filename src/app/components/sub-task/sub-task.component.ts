import { Task } from './../../types';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppState } from './../../app.state';

@Component({
  selector: 'sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {
  public taskId: string;
  public taskState: Observable<any>;
  public tasks: Task[]
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe(param => this.taskId = param.id);
    this.taskState = this.store.select(s => s.tasks);
    this.taskState.subscribe(t => {
      this.tasks = t.tasks.filter(tas => tas._id === this.taskId);
      console.log(this.taskId, t, this.tasks);
    }
    );
  }

}
