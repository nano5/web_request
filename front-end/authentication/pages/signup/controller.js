var view = require("authentication/pages/signup/view");
var model = require("authentication/pages/signup/model");

function Controller() {};

Controller.prototype.signup = function() {
	var signup = new view.default.Signup({User: model.default.User});
	signup.render();
}

var _controller = new Controller();

export default {
	controller: _controller
}