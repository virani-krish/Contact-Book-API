const db = require("../config/db");

module.exports.addContact = (req, res, next) => {

    const { contactName, contactNumber } = req.body;
    const userId = req.user.id;

    const addContactSQL = "INSERT INTO contacts (contact_name, contact_number, user_id) values(?,?,?)";

    db.query(addContactSQL, [contactName, contactNumber, userId], (err, result) => {

        if(err) return next(err);

        return res.status(201).json({
            success: true,
            message: "contact added successfully"
        });

    });

}

module.exports.viewContact = (req, res, next) => {

    const userId = req.user.id;

    const showContactSQL = "SELECT contact_name, contact_number FROM contacts where user_id=?";

    db.query(showContactSQL, [userId], (err, result) => {

        if(err) return next(err);

        return res.status(200).json({
            success: true,
            message: "Contact data get successfully",
            result
        });

    });

}