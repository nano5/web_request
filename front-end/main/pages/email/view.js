var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

import markup from "main/pages/email/partials/email-page-template.htm"

var Email = Backbone.View.extend({
	el: ".content",
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	Email:Email
}
