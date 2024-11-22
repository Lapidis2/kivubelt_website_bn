const express = require("express")
const upload = require("../multer/multer.config")
const { createService } = require("../controller/serviceController")
const router = express.Router()

router.post('/service', upload, createService)
module.exports = router