var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import markup from 'main/partials/main-page-template.htm';

var Main = Backbone.View.extend({
	el : ".left-menu",
	render: function(Model) {
		// going to get application state
		// then depending on the state
		// will load up some page
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	Main:Main
}

