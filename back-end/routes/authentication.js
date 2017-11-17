var _authenticationRouter = require("express").Router();
var authenticationController = require("../controllers/authentication").controller;

_authenticationRouter.post("/signup", authenticationController.post_signup);
_authenticationRouter.post("/login", authenticationController.post_login)

module.exports = {authenticationRouter: _authenticationRouter};
