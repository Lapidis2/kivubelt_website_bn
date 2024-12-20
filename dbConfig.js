// @ts-nocheck
require('dotenv').config();
const mongoose = require("mongoose")
mongoose
    .connect(process.env.URI, {

        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    })
    .then(() => console.log("DB connected successfully."))
    .catch((error) => {
        console.log("Database connection failed:", error.message);
    });