const mongoose = require("mongoose");

const Postschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        // required: true,
    },
    category: {
        type: Array,
        required: true,
    }
}, { timestmaps: true }
)

module.exports = mongoose.model("Post", Postschema);