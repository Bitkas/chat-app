import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class webSocketHandler {

    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io;
    }

    JoinRoom(room: string, socket: Socket): void {
        socket.join(room);
    }

    BroadcastMessage(message: string): void {
        for(const [name, room] of this.io.sockets.adapter.rooms) {
            if(room.size > 0) {
                this.io.to(name).emit("broadcast-message", message);
                break;
            }
        }
    }
}