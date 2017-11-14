var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import markup from "main/pages/chat_rooms/partials/chat_room-page-template.htm"
// grab a controller, and use it to render a sub page?
var ChatRooms = Backbone.View.extend({
	el: ".content",
	render: function(Model) {
		var model = new Model();
		var template = _.template(markup);
		this.$el.html(template(model));
	}
});

export default {
	ChatRooms:ChatRooms
}