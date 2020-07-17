import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIPath } from '../global';

const token = localStorage.getItem('Token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class TokenService {
  constructor(private http: HttpClient) { }

  public GenerateToken(data: any) {
    return this.http.post(APIPath + 'tokens', data, httpOptions);
  }
}
