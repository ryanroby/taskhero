import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIPath } from '../global';

const token = localStorage.getItem('Token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Token': token
  })
};

@Injectable()
export class CompletedService {
  constructor(private http: HttpClient) { }

  public GetCompletedTasks() {
    return this.http.get(APIPath + 'tasks/?filter[completed]=true', httpOptions);
  }

  public RestoreTask(data: any) {
    return this.http.post(APIPath + 'tasks/' + data.Id + '/uncomplete', data, httpOptions);
  }

  public DeleteTask(data: any) {
    return this.http.delete(APIPath + 'tasks/' + data.Id, httpOptions);
  }
}
