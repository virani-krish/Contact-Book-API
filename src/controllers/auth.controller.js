const db = require("../config/db");
const { env } = require("../config/env");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const CreateUserSQL = "INSERT INTO users (name, email, password) VALUES (?,?,?)";

    db.query(CreateUserSQL, [name, email, hashPassword], (err, result) => {

        if (err) return next(err);

        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });

    });

}

module.exports.login = (req, res, next) => {

    const { email, password } = req.body;

    const SelectUserSQL = "SELECT * FROM users where email=? LIMIT 1";

    db.query(SelectUserSQL, [email], async (err, result) => {

        if (err) return next(err);

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email not registered"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            env.JWT_KEY,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    });

}

module.exports.logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });

}