"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static("../angular-app/dist/chat-app"));
app.get("/api/data", (req, res) => {
    res.status(200).json({ data: "Hello World!" });
});
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
