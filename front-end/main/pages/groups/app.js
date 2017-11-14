var controller = require("main/pages/groups/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.groups();
}

var app = new App();

export default {
	app:app
}