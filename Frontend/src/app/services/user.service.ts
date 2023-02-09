import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(userId: any):Observable<any>{
    return this.http.get(`${environment.baseUrl}/chats/${userId}`);
  }

  getMe(userId: any): Observable<any>{
    return this.http.get(`${environment.baseUrl}/me/${userId}`);
  }

  updateProfile(data: any): Observable<any>{
    return this.http.put(`${environment.baseUrl}/updatepp/${data.id}`, data)
  }
}
