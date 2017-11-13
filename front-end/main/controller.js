var model = require("./model");
var view = require("./view");

function Controller(){};

Controller.prototype.index = function() {
	var main = new view.default.Main();
	main.render(model.default.ApplicationState);
};
var controller = new Controller();
export default {
	controller:controller
}