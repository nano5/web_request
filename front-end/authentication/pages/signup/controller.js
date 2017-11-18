var view = require("authentication/pages/signup/view");

function Controller() {};

Controller.prototype.signup = function() {
	var signup = new view.default.Signup();
	signup.render();
}

var _controller = new Controller();

export default {
	controller: _controller
}