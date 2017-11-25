global.base_url = "http://localhost:8080/";
var mainController = require("main/controller").default.controller;
var MainRouter = require("main/router").default.Router;
var mainRouter = new MainRouter();
mainController.main();
Backbone.history.start();