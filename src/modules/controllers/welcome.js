import welcome from "views/welcome.js"; 

function WelcomeController(){}



WelcomeController.prototype.index = function() {
	var model = {name:"spiderman"};
	var view = new welcome.View();
	view.render(model);
};

var controller = new WelcomeController();



export default {
	   controller:controller
	}