const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        required: false
    }
});

const Message = mongoose.model("post", messageSchema);
module.exports = Message;