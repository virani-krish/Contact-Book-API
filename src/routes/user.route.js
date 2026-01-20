const route = require("express").Router();

const { profile } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");

route.get("/profile", authMiddleware, asyncHandler(profile));

module.exports = route;