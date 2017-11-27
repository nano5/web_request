var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var favoritesApp = require("main/pages/people/pages/favorites/app").default.app;
var findPeopleApp = require("main/pages/people/pages/find_people/app").default.app;


var Router = Backbone.Router.extend({
	routes: {
		"people/find_people": "findPeople",
		"people/favorites": "favorites"
	},
	findPeople: function() {
		console.log("will render find_people view");
		
		if (!$(".menu-tab#menu-people").hasClass("active")) {
			this.navigate("people", {trigger: true});
			this.navigate("people/find_people", {trigger: true});
			return;
		}
		
		if (!$("#people-menu-find_people").hasClass("active")) {
			$(".people-tab.active").toggleClass("active");
			$("#people-menu-find_people").toggleClass("active");
		}

		findPeopleApp.start();
	},
	favorites: function() {
		console.log("will render favorites view");

		if (!$(".menu-tab#menu-people").hasClass("active")) {
			this.navigate("people", {trigger: true});
			this.navigate("people/favorites", {trigger: true});
			return;
		}

		if(!$("#people-menu-favorites").hasClass("active")) {
			$(".people-tab.active").toggleClass("active");
			$("#people-menu-favorites").toggleClass("active");
		}
		favoritesApp.start();
	}
});

export default {
	Router: Router
}