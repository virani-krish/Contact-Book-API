const { body } = require("express-validator");

module.exports.registerValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .bail()
        .isLength({ min: 3 }).withMessage("Name must be at least 3 character"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 1 }).withMessage("Password must be at least 1 chacter")

];

module.exports.loginValidation = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email should enter")
        .bail()
        .isEmail().withMessage("Invalid email"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password should enter")
        .bail()
        .isLength({ min: 3 }).withMessage("Password must be at least 3 chacter")
]