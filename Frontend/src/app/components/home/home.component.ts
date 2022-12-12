import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3333');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    socket.on("hello", (arg) => {
      console.log(arg); // world
     
    });
  }



}
