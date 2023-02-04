import { Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { io } from "socket.io-client";
import { BehaviorSubject } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private token: TokenService,
    private chat: ChatService
  ) {}

  @ViewChild(IonContent) content!: IonContent;

  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  public message$: BehaviorSubject<any> = new BehaviorSubject([]);

  name = this.route.snapshot.paramMap.get('name');
  id = this.route.snapshot.params['id'];

  message: string = '';
  hold: any = this.token.decode();

  msg: any = [];

  ngOnInit() {
    this.chat.connect(this.hold.id);

    this.getMessages();

    const socket = io(`http://localhost:3333`);

    socket.on('mesRec', (mess:any)=>{
      console.log(mess);
    })

    this.chat.getNewMessage().subscribe({
      next: (val: any)=>{
        this.message$.next(val[0].chats);
        this.message$.subscribe({
          next:(res: any)=>{
            // console.log(res);
          }
        })
      }
    })
  }

  getMessages() {
    const data = {
      sender: this.hold.id,
      receiver: this.id,
    };

    this.chat.getMessages(data).subscribe({
      next: (res: any) => {
        this.msg = res[0].chats;
        // console.log(res[0].chats);
        this.message$.next(this.msg)
      },
    });
  }

  send() {
    const messageData = {
      sender: this.hold.id,
      receiver: this.id,
      message: this.message,
    };

    // console.log(messageData)

    this.chat.sendMessage(messageData);
    // .subscribe({
    //   next: (value: any) =>{
    //     console.log(value);
    
    //   },
    //   error: (err: any) =>{
    //     console.log(err);
    //   },
    // });

    // this.chat.getNewMessage().subscribe({
    //   next: (val: any)=>{
    //     console.log(val)
    //   }
    // })

    this.message = '';
  }
}
