import { Component, Input, SimpleChanges } from '@angular/core';
import { Message } from "../../../../server/models/Message";
import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() room: string = "";
  messages: Array<string> = [];
  socket: Socket;
  constructor() {
    this.socket = io();
  }  

  ngOnChanges(changes: SimpleChanges) {
    if(changes["room"] !== undefined) {
      this.SetupChat()
    }
  }
  SetupChat() {
    this.socket.on("error", (error) => {
      console.log("ERROR: ", error);
    });
    this.socket.emit("joinRoom", this.room);
    this.socket.on("broadcast-message", (message: string) => {
      console.log("message: ", message)
      this.messages.push(message);
    })
  }

  send(message: string) {
    this.messages.push(message);
    this.socket.emit("message", message, this.room)
  }
}
