"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const accountKey = __importStar(require("./serviceAccountKey.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const firebase_service_1 = require("./firebase.service");
const web_sockets_handler_1 = require("./scripts/web-sockets-handler");
const app = (0, express_1.default)();
const SERVER_PORT = 3000;
app.use(express_1.default.static("../angular-app/dist/chat-app"));
app.use(body_parser_1.default.json({ limit: "30 mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30 mb", extended: true }));
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: accountKey.project_id,
        clientEmail: accountKey.client_email,
        privateKey: accountKey.private_key
    })
});
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
app.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.body;
    console.log("HERE REGISTER");
    const hasUser = yield firestoreService.GetOne("users", user.username);
    if (hasUser === undefined) {
        const newUser = yield firestoreService.AddOne("users", user.username, user);
        console.log("CREATED!");
        response.status(200).json(newUser);
    }
    else {
        console.log("NOT CREATED");
        response.status(409).json({ "message": "Username already exists" });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    console.log("LOGIN: ", newUser);
    const hasUser = yield firestoreService.GetOne("users", newUser.username);
    console.log("HASUSER: ", hasUser === null || hasUser === void 0 ? void 0 : hasUser.password);
    if (hasUser === undefined) {
        res.status(404).json({ "message": "User does not exists" });
    }
    else if (newUser.password !== hasUser.password) {
        res.status(401).json({ "message": "Wrong Password" });
    }
    else {
        res.status(200).json(hasUser);
    }
}));
io.on("connection", (socket) => {
    const socketHandler = new web_sockets_handler_1.webSocketHandler(socket);
});
httpServer.listen(SERVER_PORT);
