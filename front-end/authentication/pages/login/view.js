var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("authentication/pages/login/model").default.User;
// console.log(require("authentication/router"));

import markup from "authentication/pages/login/partials/login-page-template.htm"

$.fn.serializeObject = function() {
  	var o = {};
  	var a = this.serializeArray();
  	$.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  	});
  		return o;
};

var Login = Backbone.View.extend({
	el: ".content",
	initialize: function(options) {
		this.options = options;
	},
	render: function() {
		var template = _.template(markup);
		this.$el.html(template({}));
	},
	events:{
		"submit .login-form": "loginUser"
	},
	loginUser: function(ev) {
		var userData = $(ev.currentTarget).serializeObject();
		var user = new User(userData);
		var thisView = this;
		user.save(null, {
			success: function() {
				console.log("saved user");
				window.location.replace("http://localhost:8080/");
			},
			error: function() {
				console.log("did not save user");
				alert("wrong username or password");
			}
		});
		console.log("trying to log in user")
		return false;
	}
});

export default {
	Login:Login
}