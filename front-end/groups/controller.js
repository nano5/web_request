var model = require("groups/model");
var view = require("groups/view");

function Controller(){};

Controller.prototype.groups = function() {
	var groups = new view.default.Groups();
	groups.render(model.default.Groups);
}

var controller = new Controller();

export default {
	controller:controller
}