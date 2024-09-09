const express = require('express');
const app = express()
const http = require('http');
const { join } = require('path');
const socketio = require('socket.io');

let server = http.createServer(app)
let io = socketio(server)

app.set("view engine", "ejs");
app.use(express.static(join(__dirname,"public")))

io.on('connection', (socket) => {
    console.log("connected");
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("server started at port", 3000);
})