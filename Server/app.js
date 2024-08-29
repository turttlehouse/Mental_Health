const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

require('dotenv').config();

const corsOptions = {
    origin: '*', // Allow all origins. Modify this to restrict access to specific origins.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));  

const { connectDatabase } = require("./dbConfig/database");
connectDatabase();

app.use(express.json()); // parse incoming json data
app.use(express.urlencoded({ extended: true })); // parse incoming url-encoded data

// Importing routes
const authRoute = require("./route/authRoute");
const articleRoute = require("./route/articleRoute");
const campaignRoute = require("./route/campaignRoute")

// Use /api prefix consistently
app.use("/api", authRoute);
app.use("/api/articles", articleRoute);
app.use("/api/campaigns",campaignRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        "message": "hello world"
    });
});

app.listen(port, () => {
    console.log(`Node.js project has started at port ${port}`);
});
