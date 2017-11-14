var controller = require("requests/controller").default.controller;

function App(){}

App.prototype.start = function() {
	controller.requests();
}

var app = new App();

export default {
	app:app
}