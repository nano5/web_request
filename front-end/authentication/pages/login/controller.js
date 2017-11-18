var model = require("authentication/pages/login/model");
var view = require("authentication/pages/login/view");

function Controller(){};

Controller.prototype.login = function() {
	var login = new view.default.Login();
	login.render(model.default.Login);
}

var _controller = new Controller();

export default {
	controller: _controller
}