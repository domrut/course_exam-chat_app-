const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInventorySchema = new Schema({
    items: {
        type: Array,
        required: true,
        default: []
    }
});

const UserInventory = mongoose.model("UserInventory", userInventorySchema);

module.exports = UserInventory;