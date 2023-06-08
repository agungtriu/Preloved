const { AccountController } = require("../controllers");

const accountRoute = require("express").Router();

accountRoute.post("/register", AccountController.register);
accountRoute.post("/login", AccountController.login);

module.exports = accountRoute;
