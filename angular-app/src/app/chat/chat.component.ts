import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnChanges {
  @Input() room = '';
  messages: Array<{
    message: string;
    className: string;
  }> = [];
  socket: Socket;
  inputText = 'Aa';

  constructor() {
    this.socket = io();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['room'] !== undefined) {
      this.SetupChat();
    }
  }
  private SetupChat() {
    this.socket.on('error', (error) => {
      console.log('ERROR: ', error);
    });
    this.socket.emit('joinRoom', this.room);
    this.socket.on('broadcast-message', (message: string) => {
      this.messages.push({
        message: message,
        className: 'outMessage',
      });
    });
  }

  protected Send(inputField: HTMLParagraphElement) {
    const message = inputField.innerText;
    this.messages.push({
      message: message,
      className: 'ownMessage',
    });
    this.socket.emit('message', message, this.room);
    inputField.innerHTML = '';
  }
}
