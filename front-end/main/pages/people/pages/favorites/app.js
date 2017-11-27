var controller = require("main/pages/people/pages/favorites/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.favorites();
}

var app = new App();

export default {
	app: app
}