const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDb = require("../schema/userSchema");
const conversationDb = require("../schema/conversationSchema");
require("dotenv").config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = {
    register: async (req, res) => {
        const {username, password, image} = req.body
        const hash = await bcrypt.hash(password, 3)
        const user = new userDb({
            username,
            password: hash,
            image
        })

        await user.save();
        return res.send({error: false, message: "Registration completed, login"})
    },

    login: async (req, res) => {
        const {username, password} = req.body
        const user = await userDb.findOne({username})
        if (!user) return res.send({error: true, message: "This user does not exist"})

        const samePassword = await bcrypt.compare(password, user.password)
        if (!samePassword) return res.send({error: true, message: "Incorrect password"})
        const token = jwt.sign(user.username, ACCESS_SECRET);
        return res.send({error: false, user: token, username: username})
    },

    profile: async (req, res) => {
        const {username} = req.user;
        const user = await userDb.findOne({username})
        return res.send({error: false, user: {image: user.image, username: user.username}})
    },

    updateInfo: async (req, res) => {
        const {username, image, password} = req.body;
        let token = "";
        if (username !== "") {
            const isCreated = await userDb.findOne({username});
            if (isCreated) return res.send({error: true, message: "username already exists"})
            await userDb.findOneAndUpdate(
                {_id: req.user.id},
                {$set: {username: username}},
                {new: true}
            )
            token = jwt.sign(username, ACCESS_SECRET);
        }
        if (image !== "") {
            await userDb.findOneAndUpdate(
                {_id: req.user.id},
                {$set: {image: image}},
                {new: true}
            )
        }
        if (password !== "") {
            const hash = await bcrypt.hash(password, 3)
            await userDb.findOneAndUpdate(
                {_id: req.user.id},
                {$set: {password: hash}},
                {new: true}
            )
        }
        const user = await userDb.findOne({_id: req.user.id})
        return res.send({error: false, user, token, message: "user data updated"})
    },

    sendNewMessage: async (req, res) => {
        const {users, messages} = req.body;
        let conversations = await conversationDb.find();
        let flag = false;
        conversations.map(el => {
            if ((el.users.filter(item => item === req.user.username).length >= 1)
                && el.users.filter(item => item === users[0]).length >= 1) {
                flag = true;
            }
        })
        if (flag) return res.send({error: true, message: "You already have conversation with this person"})
        users.push(req.user.username);
        messages[0].sender = req.user.username;
        const conversation = new conversationDb({
            users,
            messages
        });

        await conversation.save();
        return res.send({error: false, message: "Message sent", conversation: conversation})
    },

    getMessages: async (req, res) => {
        let conversations = await conversationDb.find();
        let userConvo = [];
        conversations.map(el => {
            if (el.users.filter(item => item === req.user.username).length >= 1) {
                userConvo.push(el);
            }
        })
        return res.send({error: false, conversations: userConvo})
    },

    getChat: async (req, res) => {
        let conversation = await conversationDb.findOne({_id: req.body.id});
        return res.send({error: false, conversation, myUsername: req.user.username})
    },

    addMessage: async (req, res) => {
        const {message, id} = req.body;
        await conversationDb.findOneAndUpdate(
            {_id: id},
            {$push: {messages: message}},
            {new: true}
        )
        return res.send({error: false, message: "sent"})
    },

    deleteConversation: async (req, res) => {
        const {id} = req.body
        conversationDb.deleteOne(
            {_id: id},
        ).then(() => {
            return res.send({error: false})
        })
    },

    addLike: async (req, res) => {
        const {id, username} = req.body;
        let selectedPost = await postDb.findOne({_id: id});

        console.log(selectedPost.likes, username)

        if (selectedPost.likes.filter(item => item.username === username).length === 1) {
            selectedPost = selectedPost.likes.filter(item => item.username !== username);
            await postDb.findOneAndUpdate(
                {_id: id},
                {$set: {likes: selectedPost}},
                {new: true}
            )
        } else {
            await postDb.findOneAndUpdate(
                {_id: id},
                {$push: {likes: {username}}},
                {new: true}
            )
        }

        res.send({error: false, message: "Like added"})
    }
}