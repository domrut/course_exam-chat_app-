const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    users: {
        type: Array,
        required: true,
    },
    messages: {
        type: Array,
        required: true
    }
});

const Conversation = mongoose.model("conversation", conversationSchema);
module.exports = Conversation;