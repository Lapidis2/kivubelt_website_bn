const express = require("express")

const router = express.Router()
const { subscribe } = require("../controller/subscrib")
router.post("/subscribe", subscribe)
module.exports = router