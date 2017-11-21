var _authenticationRouter = require("express").Router();
var authenticationController = require("../controllers/authentication").controller;

_authenticationRouter.post("/signup", authenticationController.post_signup);
_authenticationRouter.post("/signout", authenticationController.post_signout);
_authenticationRouter.post("/login", authenticationController.post_login);
_authenticationRouter.post("/logout", authenticationController.post_logout)
_authenticationRouter.get("/", authenticationController.get_authenticate);

module.exports = {authenticationRouter: _authenticationRouter};
