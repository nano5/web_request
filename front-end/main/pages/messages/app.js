var controller = require("main/pages/messages/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.messages();
}

var app = new App();

export default {
	app:app
}