const db = require("../config/db");

module.exports.addContact = (req, res, next) => {

    const { contactName, contactNumber } = req.body;
    const userId = req.user.id;

    const addContactSQL = "INSERT INTO contacts (contact_name, contact_number, user_id) values(?,?,?)";

    db.query(addContactSQL, [contactName, contactNumber, userId], (err, result) => {

        if (err) return next(err);

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

        if (err) return next(err);

        return res.status(200).json({
            success: true,
            message: "Contact data get successfully",
            result
        });

    });

}

module.exports.updateContact = (req, res, next) => {

    const userId = req.user.id;
    const { contactId } = req.params;
    const { contactName, contactNumber } = req.body;

    const updateContactSQL = "UPDATE contacts set contact_name = ?, contact_number = ? WHERE id = ? AND user_id = ?";

    db.query(updateContactSQL, [contactName, contactNumber, contactId, userId], (err, result) => {

        if (err) return next(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact updated successfully"
        });

    });

}

module.exports.deleteContact = (req, res, next) => {

    const userId = req.user.id;
    const { contactId } = req.params;

    const deleteContactSQL = "DELETE FROM contacts WHERE id = ? AND user_id = ?";

    db.query(deleteContactSQL, [contactId, userId], (err, result) => {

        if (err) return next(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });

    });

}