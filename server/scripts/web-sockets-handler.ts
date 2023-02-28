import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class webSocketHandler {
  private socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
    socket.on("joinRoom", this.JoinRoom.bind(this));
    socket.on("message", this.broadcastMessage.bind(this));
    socket.on("disconnect", (reason) => {
      console.log("DISCONNECTED, REASON: ", reason);
    });
  }

  JoinRoom(room: string): void {
    this.socket.join(room);
  }

  broadcastMessage(message: string, room: string): void {
    this.socket.broadcast.to(room).emit("broadcast-message", message);
  }

  get getSocket(): Socket {
    return this.socket;
  }
}
