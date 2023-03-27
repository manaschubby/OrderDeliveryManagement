require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// config
const corsOptions = require("./config/corsOptions.js");
const connectDB = require("./config/dbConn");

// Connect to MongoDB
connectDB();

// middleware
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

// Routes 
const orderRouter = require("./routes/order.js");


const port = process.env.PORT || 3001;

// Custom Middleware Logger
app.use(logger);

// CORS
app.use(cors(corsOptions));

// Built-in Middleware to handle URL encoded data
app.use(express.urlencoded({ extended: true }));

// Built-in Middleware for parsing JSON
app.use(express.json());

app.use("", orderRouter);

app.all("*", (req, res) => {
    res.status(404).send("Not found");
});


app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));
