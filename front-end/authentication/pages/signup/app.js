var controller = require("authentication/pages/signup/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.signup();
}

var app = new App();

export default {
	app:app
}