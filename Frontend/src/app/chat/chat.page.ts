import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(
    private token: TokenService,
    private user: UserService,
    public chat: ChatService
  ) {}


  messageCount$!: Observable<any>;

  public users$: any;

  users: any;
  hold: any;
  badge: any;

  ngOnInit() {
    this.hold = this.token.decode();

    // console.log(this.hold.id + ' hold');

    this.getAllUser(this.hold.id);
    this.chat.connect(this.hold.id)

    this.chat.getLastMessage(this.hold.id).subscribe((res) => {
      this.chat.receiveMessage();
      this.user.getAllUser(this.hold.id).subscribe({
        next: (res: any) => {
          this.users = res;
          // console.log(res.users);
        },
      });
    });
  }


  getAllUser(id: any) {
    this.user.getAllUser(id).subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      },
    });
  }

  markAsRead(){
    this.chat.markAsRead(this.hold.id).subscribe((res: any)=>{
       console.log(res);
       this.getAllUser(this.hold.id);
    },(err: any)=>{
      console.log(err);
    })
  }
}
