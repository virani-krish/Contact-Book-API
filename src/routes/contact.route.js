const route = require("express").Router();

const { addContact, viewContact, updateContact, deleteContact } = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { contactValidation } = require("../validators/contact.validation");
const validate = require("../middlewares/validate.middleware");

route.post("/", authMiddleware, contactValidation, validate, addContact);
route.get("/", authMiddleware, viewContact);
route.put("/:contactId", authMiddleware, contactValidation, validate, updateContact);
route.delete("/:contactId", authMiddleware, deleteContact);

module.exports = route;