import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(name, priority) {
    const uri = 'http://localhost:4000/task/add';
    const obj = {
      name: name,
      priority: priority
    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Task added'));
  }

}
