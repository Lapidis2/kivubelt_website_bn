const res = require("express/lib/response")
const review = require("../modal/reviewModal")
const reviewModal = require("../modal/reviewModal")
async function createReview(req, res) {
    try {
        const { name, email, feedback } = req.body
        if (!feedback, !email)
            res.status(400).json({
                message: "Please fill all required field"
            })

        newReview = await review.create({
            name,
            email,
            feedback

        })

        await newReview.save()
        res.status(200).json({ message: "REview added successfully" })

    } catch (error) {
        res.status(502).json({ message: error.message })

    }
}
const getReview = async(req, res) => {
    try {

        const messageData = await reviewModal.find({});


        res.status(200).json({
            message: "Published messages are:",
            data: messageData,
        });
    } catch (error) {
        console.error("Failed to fetch messages:", error);

        res.status(500).json({
            error: "Failed to fetch messages",
        });
    }
};

module.exports = { createReview, getReview }