var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import markup from "groups/partials/groups-page-template.htm"

var Groups = Backbone.View.extend({
	el: ".content",
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	Groups:Groups
}