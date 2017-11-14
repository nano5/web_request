var controller = require("main/pages/email/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.email();
}

var app = new App();

export default {
	app:app
}