var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import favoritesPageMarkup from "main/pages/people/pages/favorites/partials/favorites-page-template.htm"
import favoritesCardMarkup from "main/pages/people/pages/favorites/partials/favorites-card.htm"

$.fn.serializeObject = function() {
  	var o = {};
  	var a = this.serializeArray();
  	$.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  	});
  		return o;
};

var Favorites = Backbone.View.extend({
	el: ".people-content",
	render: function(options) {
		this.options = options;
		var favoritesByCategory = new this.options.FavoritesByCategory();
		var view = this;
		favoritesByCategory.fetch({
			success: function(modelObject) {
				var _favoritesByCategory = modelObject.attributes;
				var favoritesPageTemplate = _.template(favoritesPageMarkup);
				view.$el.html(favoritesPageTemplate({}));
				for (const category in _favoritesByCategory) {
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
	},
	events: {
		"submit .add-category-form": "addCategory",
		"click .remove-category": "removeCategory",
		"click .remove-user-action-button": "removeUser"
	},
	addCategory: function(ev) {
		var categoryInformation = $(ev.currentTarget).serializeObject();
		var category = categoryInformation.category;
		var addCategory = new this.options.AddCategory();
		addCategory.save({category: category}, {
			dataType: "text",
			success: function() {
				location.reload();
			}
		});
		return false;
	},
	removeCategory: function(ev) {
		var category = $(ev.currentTarget).data("value");
		var removeCategory = new this.options.RemoveCategory();
		removeCategory.save({category: category} ,{
			dataType: "text",
			success: function() {
				location.reload();
			}
		});
		return false;
	},
	removeUser: function(ev) {
		var other_username = $(ev.currentTarget).data("value1");
		var category = $(ev.currentTarget).data("value2");
		var removeUser = new this.options.RemoveUser();
		removeUser.save({category: category, other_username: other_username}, {
			dataType: "text",
			success: function() {
				console.log("user removed");g
				location.reload();
			}
		});
		return false;
	}
});

export default {
	Favorites: Favorites
}