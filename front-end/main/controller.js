var model = require("main/model");
var view = require("main/view");

function Controller(){};

Controller.prototype.main = function() {
	var main = new view.default.Main();
	main.render(model.default.ApplicationState);
};
var controller = new Controller();
export default {
	controller:controller
}