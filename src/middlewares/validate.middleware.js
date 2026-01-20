const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length !== 0) {

        const uniqueErrors = {};

        errors.forEach(err => {
            if (!uniqueErrors[err.path]) {
                uniqueErrors[err.path] = err.msg;
            }
        });

        return res.status(400).json({ errors: uniqueErrors });
    }
    next();
}