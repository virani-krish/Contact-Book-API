const route = require("express").Router();

const { profile } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");


route.get("/profile", authMiddleware, profile);
route.get("/profile", authMiddleware, profile);

module.exports = route;