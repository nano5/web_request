var controller = require("authentication/pages/login/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.login();
}

var app = new App();

export default {
	app:app
}