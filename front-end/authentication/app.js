var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var LoginRouter = require("authentication/router").default.Router;
var loginRouter = new LoginRouter();
Backbone.history.start();