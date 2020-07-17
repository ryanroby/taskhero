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
export class TasksService {
  constructor(private http: HttpClient) { }

  public GetSections() {
    return this.http.get(APIPath + 'sections?include=tasks', httpOptions);
  }

  public CreateSection(data: any) {
    return this.http.post(APIPath + 'sections', data, httpOptions);
  }

  public CompleteTask(data: any) {
    return this.http.post(APIPath + 'tasks/' + data.Id + '/complete', data, httpOptions);
  }

  public CreateSectionTask(data: any) {
    return this.http.post(APIPath + 'tasks', data, httpOptions);
  }

  public DeleteSection(data: any) {
    return this.http.delete(APIPath + 'sections/' + data.Id, httpOptions);
  }

  public DeleteTask(data: any) {
    return this.http.delete(APIPath + 'tasks/' + data.Id, httpOptions);
  }

}
