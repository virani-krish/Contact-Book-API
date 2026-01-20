const route = require("express").Router();

const { register, login, logout } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");

route.post("/register", registerValidation, validate, register);
route.post("/login", loginValidation, validate, login);
route.post("/logout", logout);


module.exports = route;