import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(
    private token: TokenService,
    private user: UserService,
    private chat: ChatService
  ) {}

  public users$: any;

  users: any;
  hold: any;

  ngOnInit() {
    this.hold = this.token.decode();

    console.log(this.hold.id + ' hold');

    this.getAllUser(this.hold.id);

    this.chat.getLastMessage(this.hold.id).subscribe((res) => {
      console.log(res);
      this.getAllUser(this.hold.id);
    });
  }

  getAllUser(id: any) {
    this.user.getAllUser(id).subscribe({
      next: (res: any) => {
        this.users = res.users;
        console.log(res.users);
      },
    });
  }
}
