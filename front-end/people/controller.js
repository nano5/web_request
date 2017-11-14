var model = require("people/model");
var view = require("people/view");

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

function Controller(){};

Controller.prototype.people = function() {
	var people = new view.default.People();
	people.render(model.default.People);
}

var controller = new Controller();

export default {
	controller:controller
}