"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const environment_1 = require("./environment");
const firebase_service_1 = require("./firebase.service");
const web_sockets_handler_1 = require("./scripts/web-sockets-handler");
const app = (0, express_1.default)();
const SERVER_PORT = 3000;
app.use(express_1.default.static("../angular-app/dist/chat-app"));
app.use(body_parser_1.default.json({ limit: "30 mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30 mb", extended: true }));
(0, app_1.initializeApp)(environment_1.environment.firebase);
const firestoreService = new firebase_service_1.firebaseService((0, firestore_1.getFirestore)());
app.get("/api/data", (req, res) => {
    res.status(200).json({ data: "Hello World!" });
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
app.get("/rooms/list", (req, res) => {
    const allRooms = Array.from(io.sockets.adapter.rooms.keys()).filter((room) => {
        return room.size > 0;
    });
    res.status(200).json(allRooms);
});
io.on("connection", (socket) => {
    const socketHandler = new web_sockets_handler_1.webSocketHandler(socket);
});
httpServer.listen(SERVER_PORT);
