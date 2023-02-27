import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  isRoomChosen = false;
  room = '';

  protected RoomJoined(event: { isRoomChosen: boolean; room: string }) {
    if (event.isRoomChosen === true) {
      this.room = event.room;
      this.isRoomChosen = true;
    }
  }
}
