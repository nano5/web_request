var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Router = Backbone.Router.extend({
	routes: {
		"signup": signup,
		"login": login
	},
	signup: function() {
		console.log("will render signup view");
	},
	login: function() {
		console.log("will render login view");
	}
});

export default {
	Router:Router
}