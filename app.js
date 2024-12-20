require('dotenv').config();
const express = require("express");
const router = require("./routes/userRouter");
const dbConfig = require('./dbConfig')
const app = express();
const reviewRoute = require("./routes/reviewRoutes")
const subroutes = require("./routes/subRoutes")
const serviceroutes = require("./routes/reviewRoutes")

// Middleware
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://habyarimanacaleb.github.io"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
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