var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import markup from "requests/partials/requests-page-template.htm"

var Requests = Backbone.View.extend({
	el: ".content",
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
		// at this point insert another template into this rendered template?
	}
});

export default {
	Requests:Requests
}