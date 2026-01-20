const route = require("express").Router();

const { register, login, logout } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const asyncHandler = require("../utils/asyncHandler");

route.post("/register", registerValidation, validate, asyncHandler(register));
route.post("/login", loginValidation, validate, asyncHandler(login));
route.post("/logout", asyncHandler(logout));

module.exports = route;