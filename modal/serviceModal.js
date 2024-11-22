const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


})
module.exports = mongoose.model("Service", serviceSchema)