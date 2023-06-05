const express = require("express")
const { v4: uuidv4 } = require('uuid');
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")
const mainRouter = require("./router/mainRouter");
const userDb = require("./schema/userSchema");
const postDb = require("./schema/postSchema");

const {Server} = require("socket.io");
const {disconnect} = require("mongoose");
const io = new Server({
    cors: {
        origin: "http://192.168.0.108:3000"
    }
});

io.listen(4000);

app.use(cors())
app.use(express.json())
app.listen(3002, '192.168.0.108');

mongoose.connect("mongodb+srv://drutas76:btR9gYpwV6TZ9HUx@cluster0.j1eynvm.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('CONNECT SUCCESS')
    }).catch(e => {
    console.log(e)
})

app.use("/", mainRouter);

io.on("connection", async (socket) => {
    // if (users.length !== io.engine.clientsCount) users.push({
    //     username: "",
    //     id: socket.id
    // })

    socket.on("downloadDB", async () => {
        const users = await userDb.find().lean();
        users.forEach(item => delete item.password)
        const posts = await postDb.find();
        if (users && posts) io.emit("init", {posts: posts, users: users});
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

    // socket.on("disconnect", () => {
    //     console.log(socket.id)
    //     users = users.filter(item => item.id !== socket.id)
    //     restaurants = restaurants.filter(item => item.id !== socket.id)
    // })
})