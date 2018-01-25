var model = require("main/pages/people/pages/find_people/model");
var view = require("main/pages/people/pages/find_people/view");

function Controller(){};

Controller.prototype.findPeople = function() {
	var findPeople = new view.default.FindPeople();
	findPeople.render({
		Profiles: model.default.Profiles,
		FavoriteUser: model.default.FavoriteUser,
		Categories: model.default.Categories});
}

var _controller = new Controller();

export default {
	controller: _controller
}