const route = require("express").Router();

const { addContact, viewContact } = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { addContactValidation } = require("../validators/contact.validation");
const validate = require("../middlewares/validate.middleware");

route.post("/", authMiddleware, addContactValidation, validate, addContact);
route.get("/", authMiddleware, viewContact);

module.exports = route;