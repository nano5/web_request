var mainController = require("main/controller").default.controller;
var mainRouter = require("main/router").default.router;
mainController.main();
Backbone.history.start();