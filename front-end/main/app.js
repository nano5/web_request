global.base_url = "http://localhost:8080/";
var mainController = require("main/controller").default.controller;
var MainRouter = require("main/router").default.Router;
var PeopleRouter = require("main/pages/people/router").default.Router;
var mainRouter = new MainRouter();
var peopleRouter = new PeopleRouter();
mainController.main();
Backbone.history.start();