var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import favoritesMarkup from "main/pages/people/pages/favorites/partials/favorites-page-template.htm"

var Favorites = Backbone.View.extend({
	el: ".people-content",
	render: function(options) {
		this.options = options
		var favoritesByCategory = new this.options.FavoritesByCategory();
		var view = this;
		favoritesByCategory.fetch({
			success: function(modelObject) {
				var _favoritesByCategory = modelObject.attributes;
				for (var category in _favoritesByCategory) {
					var _ids = _favoritesByCategory[category];
					var profiles = new view.options.Profiles();
					profiles.fetch({ data: $.param({ids: _ids}),
						success: function(modelObject) {
							console.log(modelObject);
							// now I can render what I need to render
							
						}
					});
				}
			}
		});
	}
});

export default {
	Favorites: Favorites
}