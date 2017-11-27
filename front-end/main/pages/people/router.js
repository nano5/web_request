var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Router = Backbone.Router.extend({
	routes: {
		"people/find_people": "find_people",
		"people/favorites": "favorites"
	},
	find_people: function() {
		console.log("will render find_people view");
		// console.log($("#people-menu-find_people").hasClass("active"));
		if (!$("#people-menu-find_people").hasClass("active")) {
			$(".people-tab.active").toggleClass("active");
			$("#people-menu-find_people").toggleClass("active");
		}

	},
	favorites: function() {
		console.log("will render favorites view");

		if(!$("#people-menu-favorites").hasClass("active")) {
			$(".people-tab.active").toggleClass("active");
			$("#people-menu-favorites").toggleClass("active");
		}

	}
});

export default {
	Router: Router
}