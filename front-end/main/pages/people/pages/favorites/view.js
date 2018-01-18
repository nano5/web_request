var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import favoritesPageMarkup from "main/pages/people/pages/favorites/partials/favorites-page-template.htm"
import favoritesCardMarkup from "main/pages/people/pages/favorites/partials/favorites-card.htm"

var Favorites = Backbone.View.extend({
	el: ".people-content",
	render: function(options) {
		this.options = options
		var favoritesByCategory = new this.options.FavoritesByCategory();
		var view = this;
		favoritesByCategory.fetch({
			success: function(modelObject) {
				var _favoritesByCategory = modelObject.attributes;
				var favoritesPageTemplate = _.template(favoritesPageMarkup);
				view.$el.html(favoritesPageTemplate({}));
				for (var category in _favoritesByCategory) {
					var _ids = _favoritesByCategory[category];
					var profiles = new view.options.Profiles();
					profiles.fetch({ data: $.param({ids: _ids}),
						success: function(collectionObject) {

							// now I can render what I need to render
							var categoryProfiles = {};
							categoryProfiles.category = category;
							categoryProfiles.profiles = collectionObject.models;

							var favoritesCardTemplate = _.template(favoritesCardMarkup);
							view.$el.find(".favorites-scroll-area").append(favoritesCardTemplate({categoryProfiles: categoryProfiles}));
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