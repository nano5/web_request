var model = require("messages/model");
var view = require("messages/view");

function Controller(){};

Controller.prototype.messages = function() {
	var messages = new view.default.Messages();
	messages.render(model.default.Messages);
}

var controller = new Controller();

export default {
	controller:controller
}