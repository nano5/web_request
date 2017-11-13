var $ = require("../../back-end/node_modules/jquery");
var _ = require("../../back-end/node_modules/underscore");
var Backbone = require("../../back-end/node_modules/backbone");
var markup = require("./partials/main-page-template.htm");
import markup from './partials/main-page-template.htm';

var Main = Backbone.View.extend({
	el : ".left-menu",
	render: function(Model) {
		// going to get application state
		// then depending on the state
		// will load up some page
		var $html = $(markup);

		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	Main:Main
}

