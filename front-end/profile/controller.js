var model = require("profile/model");
var view = require("profile/view");

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

function Controller(){};

Controller.prototype.profile = function() {
	var profile = new view.default.Profile();
	profile.render(model.default.Profile)
}

var controller = new Controller();

export default {
	controller:controller
}