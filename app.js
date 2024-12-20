require('dotenv').config();
const express = require("express");
const router = require("./routes/userRouter");
const dbConfig = require('./dbConfig')
const app = express();
const reviewRoute = require("./routes/reviewRoutes")
const subroutes = require("./routes/subRoutes")
const serviceroutes = require("./routes/reviewRoutes")

const cors = require("cors");
app.options("*", cors());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(
    cors({
        origin: "*",
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
    // Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
});