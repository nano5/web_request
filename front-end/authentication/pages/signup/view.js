var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("authentication/pages/signup/model").default.User;
import markup from "authentication/pages/signup/partials/signup-page-template.htm"


var Signup = Backbone.View.extend({
	el: ".content",
	render: function() {
		var template = _.template(markup);
		this.$el.html(template({}));
	},
	events: {
		"submit .signup-form": "signupUser"
	},
	signupUser: function(ev) {
		var userData = $(ev.currentTarget).serializeObject();
		var user = new User(userData);
		user.save(null,{
			success: function(res) {
				console.log("user signed up")
				window.location.replace(res.attributes.redirect);
			},
			error: function() {
				alert("username is taken or password is to short,must be at least 4 characters");
			}
		});
		return false;
	}
});

export default {
	Signup: Signup
}