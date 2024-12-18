const res = require("express/lib/response")
const review = require("../modal/reviewModal")
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
module.exports = createReview