const Service = require("../modal/serviceModal")
const cloudinary = require('cloudinary').v2
const upload = require("../multer/multer.config")
const fs = require('fs')
require("dotenv").config()
cloudinary.config({
    cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
    api_key: process.env.CLOUDINERY_API_KEY,
    api_secret: process.env.CLOUDINERY_SECRET_KEY,
});
async function createService(req, res) {
    try {
        const { title, headline, content } = req.body
        const imgpath = req.file.path

        let imageUrl = ""
        const result = await cloudinary.uploader.upload(imgpath)
        fs.unlinkSync(req.file.path) //remove all temporary files
        imageUrl = result.secure_url
        const newServise = await Service.create({
            title,
            headline,
            content,
            image: imageUrl
        })
        await newServise.save()
        if (newServise)
            res.status(201).json({ newServise })


    } catch (error) {
        res.status(502).json({
            message: error.message
        });

    }
}
module.exports = { createService }