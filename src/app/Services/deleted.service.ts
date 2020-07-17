import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIPath } from '../global';

const token = localStorage.getItem('Token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Token': token
  })
};

@Injectable()
export class DeletedService {
  constructor(private http: HttpClient) { }

  public GetDeletedTasks() {
    return this.http.get(APIPath + 'tasks/?filter[deleted]=true', httpOptions);
  }

  public RestoreTask(data: any) {
    return this.http.post(APIPath + 'tasks/' + data.Id + '/restore', data, httpOptions);
  }
}
