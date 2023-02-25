import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  isRoomChosen: boolean = false;
  room: string = '';

  constructor() {}

  RoomJoined(event: { isRoomChosen: boolean; room: string }) {
    if (event.isRoomChosen === true) {
      this.room = event.room;
      this.isRoomChosen = true;
    }
  }
}
