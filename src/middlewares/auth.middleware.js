const { env } = require("../config/env");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }

        const decoded = jwt.verify(token, env.JWT_KEY);

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};