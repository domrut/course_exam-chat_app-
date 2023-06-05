const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true,
        default: []
    },
    likes: {
        type: Array,
        required: true,
    }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;