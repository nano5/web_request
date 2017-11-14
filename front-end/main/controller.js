var model = require("main/model");
var view = require("main/view");

function Controller(){};

Controller.prototype.main = function(_currentPage) {
	if(_currentPage) {
		var main = new view.default.Main({currentPage: _currentPage});
	} else {
		var main = new view.default.Main();
	}
	
	main.render(model.default.ApplicationState);
};
var controller = new Controller();
export default {
	controller:controller
}