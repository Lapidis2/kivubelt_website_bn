// @ts-nocheck
require('dotenv').config();
mongoose
    .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    })
    .then(() => console.log("DB connected successfully."))
    .catch((error) => {
        console.log("Database connection failed:", error.message);
    });