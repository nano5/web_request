var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import favoritesMarkup from "main/pages/people/pages/favorites/partials/favorites-page-template.htm"

var Favorites = Backbone.View.extend({
	el: ".people-content",
	render: function(Favorites) {
		var template = _.template(favoritesMarkup);
		this.$el.html(template({}));
	}
});

export default {
	Favorites: Favorites
}