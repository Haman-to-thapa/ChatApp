"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
const users = new Map();
const messages = [];
io.on("connection", (socket) => {
    console.log(`User connected : ${socket.id}`);
    // start socket join here 
    socket.on('join', (username) => {
        users.set(socket.id, {
            id: socket.id, username: username
        });
        io.emit("userList", Array.from(users.values()));
        io.emit("userJoined", username);
        io.emit("messageHistoty", messages);
    });
    // if they connected then showing messages
    socket.on("sendMessage", (message) => {
        const user = users.get(socket.id);
        if (user) {
            const msg = {
                user,
                message,
                timestamp: new Date()
            };
            messages.push(msg);
            io.emit("newMessage", msg);
        }
    });
    // if they disconnected by the socket
    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        if (user) {
            console.log(`${user.username} left the chat`);
            users.delete(socket.id);
            io.emit("userList", Array.from(users.values()));
            io.emit('userLeft', user.username);
        }
    });
});
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
