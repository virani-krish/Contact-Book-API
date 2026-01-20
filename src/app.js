const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// routes file import
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const contactRoute = require("./routes/contact.route");

// globle middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// health route
app.get("/", (req, res) => {
    res.json({ status: "API Running" });
});

// all routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

// globle error handler
app.use((err, req, res, next) => {

    // MySQL duplicate entry
    if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            errors: {
                email: "Email already exists"
            }
        });
    }

    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;