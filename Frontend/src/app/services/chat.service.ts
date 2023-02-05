import { UserService } from './user.service';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const socket = io(`http://localhost:3333`);

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private user: UserService) { }

public message$: BehaviorSubject<any> = new BehaviorSubject({});
public lastMessage$: BehaviorSubject<any> = new BehaviorSubject({});

messageCount: any = -1;
msgReset: any = 0;

  connect(id: any){
    socket.on("connect", () => {
      socket.emit('connected', id);
      console.log(socket.id)
    });
  }

  sendMessage(data: any){
    socket.emit('send', data);

    // return this.http.post(`${environment.baseUrl}/chat`, data)

  }

  public getNewMessage = () => {
    socket.on('mesRec', (message) =>{
      // console.log(message)
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getLastMessage = (id: any) =>{
    socket.on('mesRec', (message) =>{
      this.user.getAllUser(id);
      this.lastMessage$.next('1');
    });
    return this.lastMessage$.asObservable();
  }

  getMessages(data: any): Observable<any>{
    return this.http.get(`${environment.baseUrl}/chat/${data.sender}/${data.receiver}`)
  }

  receiveMessage() {
    if(this.messageCount === -1){
      this.messageCount = 0;
    }else{
      this.messageCount++;
    }
    // console.log(this.messageCount)
  }

  viewMessage() {
    this.messageCount = this.msgReset;
    // console.log(this.messageCount)
  }

  getMessageCount(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.messageCount);
    }).pipe(map(count => count));
  }
}
