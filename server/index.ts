import express, { Response, Request, Express } from "express";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

import { User } from './models/User'
 import * as accountKey from './serviceAccountKey.json';
import bodyParser from "body-parser";
import cors from "cors";

import { environment } from "./environment";
import { firebaseService } from "./firebase.service";
import { webSocketHandler } from "./scripts/web-sockets-handler";
import { ServiceAccount } from "firebase-admin";
const app: Express = express();
const SERVER_PORT: number = 3000;

app.use(express.static("../angular-app/dist/chat-app"));
app.use(bodyParser.json({ limit: "30 mb" }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }));
initializeApp({
  credential: cert({
    projectId: accountKey.project_id,
    clientEmail: accountKey.client_email,
    privateKey: accountKey.private_key
  })
});
const firestoreService = new firebaseService(getFirestore());

app.get("/api/data", (req: Request, res: Response) => {
  res.status(200).json({ data: "Hello World!" });
});

const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/rooms/list", (req: Request, res: Response) => {
  const allRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(
    (room: any) => {
      return room.size > 0;
    }
  );

  res.status(200).json(allRooms);
});

app.post("/register", async (request: Request, response: Response) => {
  const user: User = request.body;
  const hasUser: User | undefined = await firestoreService.GetOne<User>("users", user.username);

  if(hasUser === undefined) {
    const newUser: User = await firestoreService.AddOne("users", user.username, user); 
    console.log("CREATED!")
    response.status(200).json(newUser);
  } else {
    console.log("NOT CREATED")
    response.status(409).json({"message": "Username already exists"})
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const newUser: User = req.body;
  const hasUser: User | undefined = await firestoreService.GetOne("users", newUser.username);

  if(hasUser === undefined) {
    res.status(404).json({"message": "User does not exists"});
  } else if(newUser.password !== hasUser.password) {
    res.status(401).json({"message": "Wrong Password"});
  } else {
    res.status(200).json(hasUser);
  }
})

io.on("connection", (socket: Socket) => {
  const socketHandler = new webSocketHandler(socket);
});

httpServer.listen(SERVER_PORT);
