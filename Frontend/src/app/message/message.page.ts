import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';

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

  name = this.route.snapshot.paramMap.get('name');
  id = this.route.snapshot.params['id'];

  message: string = '';
  hold: any = this.token.decode();

  msg: any = [];

  ngOnInit() {
    this.chat.connect(this.hold.id);

    this.getMessages();
  }

  getMessages() {
    const data = {
      sender: this.hold.id,
      receiver: this.id,
    };

    this.chat.getMessages(data).subscribe({
      next: (res: any) => {
        this.msg = res[0].chats;
        console.log(res[0].chats);
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

    this.chat.sendMessage(messageData).subscribe({
      next: (value) =>{
        console.log(value);
        this.getMessages();
      },
      error: (err) =>{
        console.log(err);
      },
    });

    this.message = '';
  }
}
