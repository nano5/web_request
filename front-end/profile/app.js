var controller = require("profile/controller").default.controller;
function App(){};

App.prototype.start = function() {
	controller.profile();
}

var app = new App();

export default {
	app:app
}