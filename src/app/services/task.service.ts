import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaskType } from '../types';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(taskObj) {
    const uri = 'http://localhost:4000/task/add';
    return this.http.post(uri, taskObj);
  }

  getTasks() {
    const uri = 'http://localhost:4000/task/get';
    return this
      .http
      .get(uri);
  }

  updateTask(task, type) {
    const uri = 'http://localhost:4000/task/update/' + type + '/' + task._id;
    return this
      .http
      .post(uri, task);
  }

  deleteTask(id) {
    const uri = 'http://localhost:4000/task/delete/' + id;

    return this
      .http
      .get(uri);
  }

}
