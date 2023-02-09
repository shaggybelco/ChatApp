import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})
export class ListChatsPage implements OnInit {

  constructor(
    private token: TokenService,
    private user: UserService,
    public chat: ChatService
  ) {
    this.chat.listenToTyping().subscribe((val: any)=>{
      // console.log(val)
      this.vals =val
    })
  }

  show(){
    alert('yes')
  }

  @Input() tab = 'list';

  vals: any;
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

   

    this.chat.getLastMessage(this.hold.id).subscribe((res: any) => {
      // console.log('ran')
      this.chat.getRead().subscribe((res: any)=>{
        // console.log(res);
      })
      this.chat.receiveMessage();
      
      this.user.getAllUser(this.hold.id).subscribe({
        next: (res: any) => {
          this.users = res.users;
          // console.log(res.users);
        },
      });
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

  markAsRead(){
    this.chat.markAsRead(this.hold.id).subscribe((res: any)=>{
      //  console.log(res);
       this.getAllUser(this.hold.id);

    },(err: any)=>{
      console.log(err);
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAllUser(this.hold.id);
      event.target.complete();
    }, 2000);
  };

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
}
