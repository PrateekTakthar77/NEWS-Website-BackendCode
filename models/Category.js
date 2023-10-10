const mongoose = require("mongoose");

const Categoryschema = new mongoose.Mongoose.Schema({
    category: {
        type: String
    }
}, { timestmaps: true }
)

module.exports = mongoose.model("Category", Categoryschema);