var controller = require("main/pages/people/pages/find_people/controller").default.controller;

function App(){};

App.prototype.start = function() {
	controller.findPeople();
}

var app = new App();

export default {
	app: app
}