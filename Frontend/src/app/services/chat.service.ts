import { UserService } from './user.service';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const socket = io(`http://localhost:3333`);

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private user: UserService) { 
    socket.on('typing', sender => {
      this.typing.next(sender);
    });
  }

public message$: BehaviorSubject<any> = new BehaviorSubject({});
public lastMessage$: BehaviorSubject<any> = new BehaviorSubject({});
public read$: BehaviorSubject<any> = new BehaviorSubject({});
public mess$: BehaviorSubject<any> = new BehaviorSubject(false);

private typing = new Subject<string>();
  private stopTyping = new Subject<string>();

messageCount: any = -1;
msgReset: any = 0;

  connect(id: any){
    socket.on("connect", () => {
      socket.emit('connected', id);
      console.log(socket.id)
    });
  }

  sendMessage(data: any){
    // socket.emit('send', data);

    return this.http.post(`${environment.baseUrl}/chat/${data.sender}/${data.receiver}`, data)

  }

  public getNewMessage = () => {
    socket.on('mesRec', (message) =>{
      // console.log(message)
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getRead = () => {
    socket.on('read', (message) =>{
      // console.log(message)
      this.read$.next(message);
    });

    return this.read$.asObservable();
  };

  public getLastMessage = (id: any) =>{
    socket.on('mesRec', (message) =>{
      this.user.getAllUser(id);
      this.lastMessage$.next('1');
      // console.log(message)
    });
    return this.lastMessage$.asObservable();
  }

  public getIsRead = (data: any) =>{
    socket.emit('read', data)
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

  markAsRead(id: any): Observable<any>{
    return this.http.put(`${environment.baseUrl}/update/${id}`, {isRead: true})
  }

  startTyping(data: any){
    socket.emit('typing', data);
  }

  getTyping() {
    return this.typing.asObservable();
  }

  getStopTyping() {
    return this.stopTyping.asObservable();
  }


  listenToTyping(): Observable<any> {
    socket.on('typing', (username: string) => {
      console.log(username + ' is typing...');
      this.mess$.next(true);
      setTimeout(() => {
        this.mess$.next(false);
      }, 5000);
    });

    return this.mess$.asObservable();
  }
}
