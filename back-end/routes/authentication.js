var _authenticationRouter = require("express").Router();
var authenticationController = require("../controllers/authentication").controller;

_authenticationRouter.post("/signup", authenticationController.post_signup);

module.exports = {authenticationRouter: _authenticationRouter};
