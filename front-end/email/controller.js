var model = require("email/model");
var view = require("email/view");

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

function Controller(){};

Controller.prototype.email = function() {
	var email = new view.default.Email();
	email.render(model.default.Email);
}

var controller = new Controller();

export default {
	controller:controller
}