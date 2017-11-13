var model = require("./model");
var view = require("./vide");

var $ = require("../../back-end/node_modules/jquery");
var _ = require("../../back-end/node_modules/underscore");
var Backbone = require("../../back-end/node_modules/backbone");

function Controller(){};

Controller.prototype.profile = function() {
	var profile = view.default.Profile();
	profile.render(model.default.Profile)
}