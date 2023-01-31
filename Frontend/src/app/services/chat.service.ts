import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

const socket = io(`http://localhost:3333`);

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

public message$: BehaviorSubject<any> = new BehaviorSubject({});

  connect(uuid: any){
    socket.on("connect", () => {
      socket.emit('storeClientInfo', { customId: uuid });
      console.log(socket.id)
    });
  }

  sendMessage(data: any){
    socket.emit('send-message', data);

    return this.http.post(`${environment.baseUrl}/chat`, data)

  }

  // public getNewMessage = () => {
  //   socket.on('message', (message) =>{
  //     // console.log(message)
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // };

  getMessages(data: any): Observable<any>{
    return this.http.get(`${environment.baseUrl}/chat/${data.sender}/${data.receiver}`)
  }
}
