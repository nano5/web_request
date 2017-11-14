var mainController = require("main/controller").default.controller;
var Router = require("main/router").default.Router;
var mainRouter = new Router();
mainController.main();
Backbone.history.start();