var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import markup from 'main/pages/people/partials/people-page-template.htm'

var People = Backbone.View.extend({
	el: ".content",
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	People:People
}