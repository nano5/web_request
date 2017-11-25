var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("authentication/pages/signup/model").default.User;
import markup from "authentication/pages/signup/partials/signup-page-template.htm"


var Signup = Backbone.View.extend({
	el: ".content",
	initialize: function(options) {
		this.options = options
	},
	render: function() {
		var template = _.template(markup);
		this.$el.html(template({}));
	},
	events: {
		"submit .signup-form": "signupUser"
	},
	signupUser: function(ev) {
		var userData = $(ev.currentTarget).serializeObject();
		var user = new this.options.User(userData);
		user.save(null,{
			success: function(res) {
				if (res.attributes.redirect) {
					console.log("user signed up");
					global.username = res.attributes.username;
					window.location.replace(res.attributes.redirect);
				} else {
					alert(res.attributes.error);
				}
			}
		});
		return false;
	}
});

export default {
	Signup: Signup
}