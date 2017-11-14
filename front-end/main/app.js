var mainController = require("main/controller").default.controller;
var Router = require("main/router").default.Router;

mainController.main();

var mainRouter = new Router();
Backbone.history.start();