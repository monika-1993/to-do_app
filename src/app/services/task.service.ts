import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  updateTask(taskObj) {
    const uri = 'http://localhost:4000/task/update/' + taskObj._id;
    return this
      .http
      .post(uri, taskObj);
  }

  deleteTask(id) {
    const uri = 'http://localhost:4000/task/delete/' + id;

    return this
      .http
      .get(uri);
  }

}
