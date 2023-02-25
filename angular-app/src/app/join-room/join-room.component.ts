import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
})
export class JoinRoomComponent {
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
    });
  }

  JoinRoom(room: string) {
    console.log('ROOM: ', room);
    const value = {
      room: room,
      isRoomChosen: true,
    };
    this.joinRoomEvent.emit(value);
  }
}
