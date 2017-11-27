var model = require("main/pages/people/pages/find_people/model");
var view = require("main/pages/people/pages/find_people/view");

function Controller(){};

Controller.prototype.findPeople = function() {
	var findPeople = new view.default.FindPeople();
	findPeople.render(model.default.FindPeople);
}

var _controller = new Controller();

export default {
	controller: _controller
}