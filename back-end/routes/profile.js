var _profileRouter = require("express").Router();
var profileController = require("../controllers/profile").controller;

_profileRouter.get("/people/profile/:username", profileController.get_people_profile);
_profileRouter.get("/people/my_profile/", profileController.get_people_my_profile);
module.exports = {profileRouter: _profileRouter};