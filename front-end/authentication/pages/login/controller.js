var model = require("authentication/pages/login/model");
var view = require("authentication/pages/login/view");

function Controller(){};

Controller.prototype.login = function(_router) {
	var login = new view.default.Login({router: _router});
	login.render();
}

var _controller = new Controller();

export default {
	controller: _controller
}