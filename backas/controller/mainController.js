const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDb = require("../schema/userSchema");
const postDb = require("../schema/postSchema");
require("dotenv").config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = {
    register: async (req, res) => {
        const {username, password, image} = req.body
        console.log(req.body)
        // HAS PASSWORD
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
        if(!user) return res.send({error: true, message: "This user does not exist"})

        const samePassword = await bcrypt.compare(password, user.password)
        if(!samePassword) return res.send({error: true, message: "Incorrect password"})
        const token = jwt.sign(user.username, ACCESS_SECRET);
        return res.send({error: false, user: token, username: username})
    },

    profile: async(req, res) => {
        const {username} = req.user;
        const user = await userDb.findOne({username})
        return res.send({error: false, user: {image: user.image, username: user.username} })
    },

    addPost: async (req, res) => {
        // const {username, image, comments, likes} = req.body;
        // const post = new postDb({
        //     username,
        //     image,
        //     comments,
        //     likes
        // });
        //
        // await post.save();
    },

    addComment: async (req, res) => {
        const {id, username, comment} = req.body;
        const post = await postDb.findOneAndUpdate(
            {_id: id},
            {$push: {comments: {user: username, comment: comment}}},
            {new: true}
        )

        res.send({error: false, message: "Comment added", post: post})
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