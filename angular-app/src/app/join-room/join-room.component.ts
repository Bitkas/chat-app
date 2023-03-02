import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
})
export class JoinRoomComponent implements OnInit {
  rooms: Array<string> = [];
  @Output() joinRoomEvent = new EventEmitter<{
    isRoomChosen: boolean;
    room: string;
  }>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const request = this.http.get<Array<string>>('/rooms/list');
    request.subscribe((data: Array<string>) => {
      this.rooms = data;
      console.log('DATA: ', data);
    });
  }

  protected JoinRoom(inputField: HTMLParagraphElement) {
    const room = inputField.innerText;
    if (room.length === 0) {
      alert('please write a name for the room!');
      return;
    }
    console.log('ROOM: ', room);
    const value = {
      room: room,
      isRoomChosen: true,
    };
    this.joinRoomEvent.emit(value);
    inputField.innerHTML = '';
  }
}
