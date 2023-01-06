import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: any): Observable<User>{
    return this.http.post<User>(`${environment.baseUrl}/api/reg`, data, {responseType: 'json'})
  }

  signin(data: any): Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/log`, data)
  }
}
