const http = require("http");
const cors = require("cors");
const express = require("express");
const app =express();
const {Server}= require("socket.io");

app.use(cors());

const server =http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["POST"],
        },
});

io.on("connection",(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`)
    
    socket.on("start",()=>{
        io.emit("start")
        console.log("start_recording");
    })
    socket.on("pausa",()=>{
        io.emit("pausar")
        console.log("pausar_recording");
    })
    socket.on("continua",()=>{
        io.emit("continuar")
        console.log("continua_recording");
    })
    socket.on("stop",()=>{
        io.emit("stop")
        console.log("stop_recording");
    })
    socket.on("stream",()=>{
        io.emit("stream")
        console.log("Emitido");
    })
    
})
server.listen(3001,() =>{
    console.log("Servidor iniciado")
})