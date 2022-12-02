const path=require('path');
const http=require('http');
const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 4000
// const cors = require("cors")

const publicDirectoryPath = path.join(__dirname,'/public');
app.use(express.static(publicDirectoryPath));

// app.use(express.static('public'))
// app.use(express.json())
// app.use(cors())

io.on("connection",(client)=>{
    console.log('New websocket connection');

})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})