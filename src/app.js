const express = require("express");
const { model } = require("mongoose");

const app = express();

// globle middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// health route
app.get("/", (req, res) => {
    res.json({ status: "API Running" });
});


// globle error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;