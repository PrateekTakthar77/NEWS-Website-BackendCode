const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Dealer", "Admin"],
    }
}, { timestmaps: true }
)

module.exports = mongoose.model("user", Userschema);