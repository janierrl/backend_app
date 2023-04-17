const http = require("http");
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on("start",() => {
        io.emit("start_recording");
        console.log("start_recording");
    });

    socket.on("pausa",() => {
        io.emit("pausar_recording");
        console.log("pausar_recording");
    });

    socket.on("continua",() => {
        io.emit("continuar_recording");
        console.log("continuar_recording");
    });

    socket.on("stop",() => {
        io.emit("stop_recording");
        console.log("stop_recording");
    });

    socket.on("upload",() => {
        io.emit("upload_recording");
        console.log("upload_recording");
    });
});

server.listen(3001, () => {
    console.log(`Server on port ${3001}`);
})