const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("review", reviewSchema)