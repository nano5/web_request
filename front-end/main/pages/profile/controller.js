var model = require("main/pages/profile/model");
var view = require("main/pages/profile/view");

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

function Controller(){};

Controller.prototype.profile = function() {
	var profile = new view.default.Profile({Profile: model.default.Profile});
	profile.render();
}

var controller = new Controller();

export default {
	controller:controller
}