import express, {Response, Request, Express} from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { createServer } from "http";
import { Server } from "socket.io";


import { environment } from './environment';
import { firebaseService } from './firebase.service';
import { webSocketHandler } from './scripts/web-sockets-handler';
const app: Express = express();
const PORT: number = 3000;

app.use(express.static("../angular-app/dist/chat-app"));

initializeApp(environment.firebase);
const firestoreService = new firebaseService(getFirestore());;

app.get("/api/data", (req: Request, res: Response) => {
  res.status(200).json({data: "Hello World!"})  
});

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const socketHandler = new webSocketHandler(io);

io.on("join-room", socketHandler.JoinRoom);
io.on("message", socketHandler.BroadcastMessage);

httpServer.listen(PORT);
