require('dotenv').config();
const express = require("express");
const router = require("./routes/userRouter");
const dbConfig = require('./dbConfig')
const app = express();
const reviewRoute = require("./routes/reviewRoutes")
const subroutes = require("./routes/subRoutes")
const serviceroutes = require("./routes/reviewRoutes")

const cors = require("cors");

const allowedOrigins = [
    "http://127.0.0.1:5500",
    "https://kivu-grafter.netlify.app", // Production (Netlify)
];

app.use(
    cors({
        origin: function(origin, callback) {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);


app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {

});

app.use("/", router);
app.use("/", reviewRoute)
app.use("/", subroutes)
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
});