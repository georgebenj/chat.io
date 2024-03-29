const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");

//socketIO stuff
const {Server} = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'frontend')));


//socket-watch
io.on("connection", (socket) =>{
    var connectionMsg = "connected";
    var disconnectMsg = "disconnected";
    console.log(socket.id);
    io.emit('connection', connectionMsg)
    console.log("a user connected");
    
    socket.on("disconnect", () =>{
        io.emit('connection', disconnectMsg);
        console.log("disconnected");
    });
});

//see the 'chat message' event we created and sent on form submit event
io.on('connection', (socket) =>{
    socket.on('chat message', (msg) =>{
        //'msg' is the second value that we passed through the 'socket.emit' function
        io.emit('chat message', msg);
    });
});

server.listen(3000, () =>{
    console.log("http://localhost:3000")
});