const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false
    }
});

const User = mongoose.model("useriai", userSchema);
module.exports = User;