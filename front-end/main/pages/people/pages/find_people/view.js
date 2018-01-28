var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import findPeopleMarkup from "main/pages/people/pages/find_people/partials/find_people-page-template.htm"
import profileScrollCardMarkup from "main/pages/people/pages/find_people/partials/profile-scroll-card.htm"
import messageCardMarkup from "main/pages/people/pages/find_people/partials/message-card.htm"
import addToFavoritesMarkup from "main/pages/people/pages/find_people/partials/add_to_favorites-card.htm"
import addToFavoritesSuccessMarkup from "main/pages/people/pages/find_people/partials/add_to_favorites_success.htm"
import sendWebRequestMarkup from "main/pages/people/pages/find_people/partials/send_web_request-card.htm"
import viewProfileMarkup from "main/pages/people/pages/find_people/partials/view_profile-card.htm"

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

var FindPeople = Backbone.View.extend({
	el: ".people-content",
	render: function(options) {
		this.options = options;
		var template = _.template(findPeopleMarkup);
		this.$el.html(template({}));
	},
	events: {
		"submit .search-people-form": "findPeople",
		"click .send-message-action_button": "sendMessageAction",
		"click .add-to-favorites-action_button": "addToFavoritesAction",
		"click .send-web-request-action_button": "sendWebRequestAction",
		"click .view-profile-action_button": "viewProfileAction",
		"submit .add-user-to-favorites": "addUserToFavorites"
	},
	findPeople: function(ev) {
		var searchText = $(ev.currentTarget).serializeObject().search_text;
		var profiles = new this.options.Profiles();
		var view = this;
		profiles.fetch({ data: $.param({ queryString: searchText}),
			success: function(_profiles) {
				var profilesTemplate = _.template(profileScrollCardMarkup);
				var profileList = profilesTemplate({profiles: _profiles.models});
				view.$el.find(".list-group.profile-list-group").html(profileList);
			}
		});
		return false;
	},
	sendMessageAction: function(ev) {
		var _first_name = $(ev.currentTarget).data("value1");
		var _last_name = $(ev.currentTarget).data("value2");
		var _username = $(ev.currentTarget).data("value3");
		var profileJSON = {
			first_name: _first_name,
			last_name: _last_name,
			username: _username
		};
		var messageCardTemplate = _.template(messageCardMarkup);
		this.$el.find(".profiles-action-area").html(messageCardTemplate(profileJSON));
	},
	addToFavoritesAction: function(ev) {
		var _first_name = $(ev.currentTarget).data("value1");
		var _last_name = $(ev.currentTarget).data("value2");
		var _username = $(ev.currentTarget).data("value3");
		var profileJSON = {
			first_name: _first_name,
			last_name: _last_name,
			username: _username
		};
		var addToFavoritesTemplate = _.template(addToFavoritesMarkup);
			var _categories = new this.options.Categories();
			var view = this;
			_categories.fetch({
				success: function(modelObject) {
					profileJSON.categories = modelObject.attributes.categories;
					view.$el.find(".profiles-action-area").html(addToFavoritesTemplate(profileJSON));
				}
			});
	},
	sendWebRequestAction: function(ev) {
		var _first_name = $(ev.currentTarget).data("value1");
		var _last_name = $(ev.currentTarget).data("value2");
		var _username = $(ev.currentTarget).data("value3");
		var profileJSON = {
			first_name: _first_name,
			last_name: _last_name,
			username: _username
		};
		var sendWebRequestTemplate = _.template(sendWebRequestMarkup);
		this.$el.find(".profiles-action-area").html(sendWebRequestTemplate(profileJSON));
	},
	viewProfileAction: function(ev) {
		var _first_name = $(ev.currentTarget).data("value1");
		var _last_name = $(ev.currentTarget).data("value2");
		var _username = $(ev.currentTarget).data("value3");
		var profileJSON = {
			first_name: _first_name,
			last_name: _last_name,
			username: _username
		};
		var viewProfileTemplate = _.template(viewProfileMarkup);
		this.$el.find(".profiles-action-area").html(viewProfileTemplate(profileJSON));
	},
	addUserToFavorites: function(ev) {
		var addUserToFavoritesData = $(ev.currentTarget).serializeObject();
		var favoriteUser = new this.options.FavoriteUser();
		var view = this;
		favoriteUser.save(addUserToFavoritesData, {
			dataType: "text",
			success: function() {
				console.log("added user to favorites");
				alert(addUserToFavoritesData.other_username + " has been added to " + addUserToFavoritesData.category);
			},
			error: function() {
				console.log("user already belongs to that category");
				alert(addUserToFavoritesData.other_username + " is already in category " + addUserToFavoritesData.category);
			}
		});
		return false;
	}
});

export default {
	FindPeople: FindPeople
}