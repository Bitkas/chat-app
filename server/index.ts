import express, {Response, Request, Express} from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { instrument } from '@socket.io/admin-ui';

import bodyParser from 'body-parser';
import cors from 'cors';

import { environment } from './environment';
import { firebaseService } from './firebase.service';
import { webSocketHandler } from './scripts/web-sockets-handler';
const app: Express = express();
const SERVER_PORT: number = 3000;

app.use(express.static("../angular-app/dist/chat-app"));
app.use(bodyParser.json({ limit: '30 mb'}));
app.use(bodyParser.urlencoded({ limit: '30 mb', extended: true }));

initializeApp(environment.firebase);
const firestoreService = new firebaseService(getFirestore());;

app.get("/api/data", (req: Request, res: Response) => {
  res.status(200).json({data: "Hello World!"})  
});



const httpServer = createServer(app);
const io = new Server(httpServer);


app.get("/rooms/list", (req: Request, res: Response) => {
  const allRooms = Array.from(io.sockets.adapter.rooms.keys()).filter((room: any) => {
    return room.size > 0
  });
  
  res.status(200).json(allRooms);
})

io.on("connection", (socket: Socket) => {
  const socketHandler = new webSocketHandler(socket);
})


httpServer.listen(SERVER_PORT);
