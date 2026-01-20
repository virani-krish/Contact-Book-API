const { body } = require("express-validator");

module.exports.addContactValidation = [
    body("contactName")
        .trim()
        .notEmpty().withMessage("Contact name is required"),

    body("contactNumber")
        .trim()
        .notEmpty().withMessage("Contact number is required")
        .bail()
        .isMobilePhone("en-IN").withMessage("Invalid mobile number")
];