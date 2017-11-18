var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
// var loginRouter = require("authentication/router").default.router;

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
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	},
	events:{
		"submit .login-form": "loginUser"
	},
	loginUser: function(ev) {
		var loginForm = $(ev.currentTarget).serializeObject();
		return false;
	}
});

export default {
	Login:Login
}