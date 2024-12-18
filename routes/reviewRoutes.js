const express = require("express")
const {
    createReview,
    getReview
} = require("../controller/reviewControler")

const router = express.Router()

router.post("/createReview", createReview)
router.get("/getReview", getReview)
module.exports = router