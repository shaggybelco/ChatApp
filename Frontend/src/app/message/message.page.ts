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

  constructor(private route: ActivatedRoute, private token: TokenService, private chat: ChatService) { }

  name = this.route.snapshot.paramMap.get('name');
  id = this.route.snapshot.params['id'];

  message: string = '';
  hold: any;

  msg: any = [];

  ngOnInit() {
    this.hold = this.token.decode();

    this.chat.connect(this.hold.id);

    // this.chat.getNewMessage().subscribe({
    //   next: (res: any)=>{
        
    //     this.msg.push(res);
    //     console.log(this.msg);
    //   }
    // })

    const data = {
      reciever: this.hold.id
    }

    this.chat.getMessages(data).subscribe(
      {
        next: (res: any)=>{
          this.msg = res
          console.log(res)
        }
      }
    )
  }

  send(){
    const messageData = {
      sender: this.hold.id,
      reciever: this.id,
      message: this.message
    }

    // console.log(messageData)

    this.chat.sendMessage(messageData).subscribe(
      {
        next(value) {
            console.log(value);
        },error(err) {
            console.log(err);
        },
      }
    );

    this.message = '';
  }

}
