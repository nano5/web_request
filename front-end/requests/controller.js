var model = require("requests/model");
var view = require("requests/view");

function Controller(){};

Controller.prototype.requests = function() {
	var requests = new view.default.Requests();
	requests.render(model.default.Requests);
}

var controller = new Controller();

export default {
	controller:controller
}