import express, {Response, Request, Express} from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

import { environment } from './environment';
import { firebaseService } from './firebase.service';
const app: Express = express();
const PORT: number = 3000;

app.use(express.static("../angular-app/dist/chat-app"));

initializeApp(environment.firebase);
const firestoreService = new firebaseService(getFirestore());;

app.get("/api/data", (req: Request, res: Response) => {
  res.status(200).json({data: "Hello World!"})  
});

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})