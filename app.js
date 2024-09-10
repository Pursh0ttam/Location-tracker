const express = require('express');
const app = express()
const http = require('http');
const { join } = require('path');
const socketio = require('socket.io');
const os = require('os');


let {username}=os.userInfo()

let server = http.createServer(app)
let io = socketio(server)

app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "public")))

io.on('connection', (socket) => {
    io.emit("new-User",`${username} joined`)
    socket.on("send-message", (data) => {
        
        io.emit("recived-location", { id: socket.id, ...data })
    })
    socket.on('disconnect',()=>{
        io.emit('user-disconnected',socket.id)
    })
})

io.on('disconnect',(socket)=>{
    io.emit('user-disconnected',socket.id)
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("server started at port", 3000);
})