var _peopleRouter = require("express").Router();
var peopleController = require("../controllers/people").controller;

_peopleRouter.get("/people/profiles/:queryString", peopleController.get_people_profiles);

module.exports = {peopleRouter: _peopleRouter};