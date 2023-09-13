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
        origin: "http://192.168.0.105:3000"
    }
});

io.listen(4000);

app.use(cors())
app.use(express.json())
app.listen(3002, '192.168.0.105');

mongoose.connect(DBkey)
    .then(() => {
        console.log('CONNECT SUCCESS')
    }).catch(e => {
    console.log(e)
})

app.use("/", mainRouter);

let connectedClients = [];

io.on("connection", async (socket) => {

    connectedClients[socket.id] = socket;

    socket.on("downloadDB", async () => {
        const users = await userDb.find().lean();
        users.forEach(item => delete item.password)
        const conversations = await conversationDb.find();
        if (users && conversations) io.emit("init", {conversations, users});
    })

    socket.on("downloadChat", async () => {
        const conversations = await conversationDb.find();
        if (conversations) io.emit("chat", {conversations});
    })

    socket.on("message", async(obj) => {
        const conversations = await conversationDb.find()
        if (conversations) io.emit("color", conversations)
    })

    socket.on("disconnect", () => {
        delete connectedClients[socket.id];
    })
})