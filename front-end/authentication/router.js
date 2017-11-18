var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var loginApp = require("authentication/pages/login/app").default.app;

var Router = Backbone.Router.extend({
	routes: {
		"signup": "signup",
		"login": "login",
		"": "redirectToLogin"
	},
	signup: function() {
		console.log("will render signup view");
	},
	login: function() {
		console.log("will render login view");
		loginApp.start(this);
	},
	redirectToLogin: function() {
		console.log("redirecting to login screen");
		this.navigate("login", {trigger:true});
	}
});

export default {
	Router: Router
}