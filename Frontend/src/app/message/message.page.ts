import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { io } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
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
    public chat: ChatService
  ) {
    this.chat.listenToTyping().subscribe((val: any) => {
      // console.log(val)
      this.vals = val;
    });
    // this.chat.getTyping().subscribe(sender => {
    //   this.typing = true;
    // });

    // this.chat.getStopTyping().subscribe(sender => {
    //   setTimeout(() => {
    //     this.typing = false;
    //   }, 5000);
    // });
  }

  vals: any;

  @ViewChild(IonContent) content!: IonContent;

  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);
    // this.markAsRead();
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }

  ngAfterViewChecked() {
    this.chat.viewMessage();
    this.scrollToBottom();
  }

  public message$: BehaviorSubject<any> = new BehaviorSubject([]);

  name = this.route.snapshot.paramMap.get('name');
  id = this.route.snapshot.params['id'];

  message: string = '';
  hold: any = this.token.decode();

  msg: any = [];
  socket = io(`http://localhost:3333`);

  ngOnInit() {
    this.markAsRead();

    this.chat.connect(this.hold.id);

    this.getMessages();

    this.chat.getIsRead({
      isRead: true,
      receiver: this.id,
      sender: this.hold.id,
    });

    this.chat.getRead().subscribe((res: any) => {
      // console.log('reading');
    });

    this.chat.getNewMessage().subscribe({
      next: (val: any) => {
        // console.log(val);
        this.message$.next(val[0].chats);
        this.message$.subscribe({
          next: (res: any) => {
            // console.log(res);
          },
        });
      },
    });
  }

  typing = false;
  startTyping() {
    this.chat.startTyping({ receiver: this.id, message: this.message });
    this.typing = true;
  }

  getMessages() {
    const data = {
      sender: this.hold.id,
      receiver: this.id,
    };

    this.chat.getMessages(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.msg = res[0].chats;
        // console.log(res[0]);
        this.message$.next(this.msg);
      },
    });
  }

  send() {
    if (this.message.length < 1) {
      return;
    } else {
      const messageData = {
        sender: this.hold.id,
        receiver: this.id,
        message: this.message,
      };
      this.typing = false;
      this.message = '';

      this.chat.sendMessage(messageData);
      this.chat.getStopTyping().subscribe((sender) => {
        this.typing = false;
      });
    }
  }

  transform(date: any) {
    if (!date) {
      return 'a long time ago';
    }
    let time = (Date.now() - Date.parse(date)) / 1000;
    if (time < 10) {
      return 'just now';
    } else if (time < 60) {
      return 'a second ago';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i] + plural + ' ago';
  }

  markAsRead() {
    this.chat.markAsRead(this.id).subscribe(
      (res: any) => {
        //  console.log(res);
        //  this.getAllUser(this.hold.id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
