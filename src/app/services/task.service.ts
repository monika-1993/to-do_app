import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(taskObj) {
    const uri = 'http://localhost:4000/task/add';
    this.http.post(uri, taskObj)
      .subscribe(res => console.log('Task added'));
  }

  getTasks() {
    const uri = 'http://localhost:4000/task/get';
    return this
      .http
      .get(uri)
      .subscribe(res => {
        return res;
      });
  }

  updateTask(id, taskObj) {
    const uri = 'http://localhost:4000/task/update/' + id;
    this
      .http
      .post(uri, taskObj)
      .subscribe(res => console.log('Done'));
  }

  deleteCoin(id) {
    const uri = 'http://localhost:4000/task/delete/' + id;

    return this
      .http
      .get(uri)
      .subscribe(res => {
        return res;
      });
  }

}
