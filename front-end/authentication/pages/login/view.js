var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

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
		var user = new this.options.User(userData);
		user.save(null, {
			success: function(res) {
				console.log("logged in user.");
				if (res.attributes.redirect) {
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
	Login:Login
}