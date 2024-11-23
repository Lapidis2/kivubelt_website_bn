const express = require("express")
const
    createReview = require("../controller/reviewControler")
const router = express.Router()

router.post("/createReview", createReview)
module.exports = router