var controller = require("main/pages/people/controller").default.controller;
function App(){};

App.prototype.start = function() {
	controller.people();
}

var app = new App();

export default {
	app:app
}
