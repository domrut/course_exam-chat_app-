const express = require("express")
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")
const mainRouter = require("./router/mainRouter");
const userDb = require("./schema/userSchema");
const conversationDb = require("./schema/conversationSchema");
require("dotenv").config();

const DBkey = process.env.DBKEY;

const {Server} = require("socket.io");
const io = new Server({
    cors: {
        origin: "http://192.168.0.108:3000"
    }
});

io.listen(4000);

app.use(cors())
app.use(express.json())
app.listen(3002, '192.168.0.108');

mongoose.connect(DBkey)
    .then(() => {
        console.log('CONNECT SUCCESS')
    }).catch(e => {
    console.log(e)
})

app.use("/", mainRouter);

let connectedClients = [];

io.on("connection", async (socket) => {
    // if (users.length !== io.engine.clientsCount) users.push({
    //     username: "",
    //     id: socket.id
    // })

    connectedClients[socket.id] = socket;

    socket.on("downloadDB", async () => {
        const users = await userDb.find().lean();
        users.forEach(item => delete item.password)
        const conversations = await conversationDb.find();
        if (users && conversations) io.emit("init", {conversations, users});
    })

    //send event from back
    // io.emit("init", async () => {
    //     const users = await userDb.find();
    //     return users;
    // })

    //receive event from front
    socket.on("message", (obj) => {
        console.log(obj)
        //emit event to all sockets(sessions)
        // io.emit("messages", obj)

        //emit event to all sockets except the sender
        // socket.broadcast.emit("color", color)

        //emit event to certain socket(session) id
    })
    console.log("socket connected")

    socket.on("disconnect", () => {
        console.log(socket.id)
        delete connectedClients[socket.id];
        console.log(connectedClients)
    })
})