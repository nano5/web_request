var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var Profiles = require("main/pages/people/pages/find_people/model").default.Profiles;
var FavoriteUser = require("main/pages/people/pages/find_people/model").default.FavoriteUser;
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
	render: function(Profiles) {
		var template = _.template(findPeopleMarkup);
		this.$el.html(template({}));
	},
	events: {
		"submit .search-people-form": "findPeople",
		"click .people-action_button": "executeAction",
		"submit .add-user-to-favorites": "addUserToFavorites"
	},
	findPeople: function(ev) {
		var searchText = $(ev.currentTarget).serializeObject().search_text;
		var profiles = new Profiles();
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
	executeAction: function(ev) {
		var _first_name = $(ev.currentTarget).attr("data-value1");
		var _last_name = $(ev.currentTarget).attr("data-value2");
		var _username = $(ev.currentTarget).attr("data-value3");
		var profileJSON = {
			first_name: _first_name,
			last_name: _last_name,
			username: _username
		}
		var action = $(ev.currentTarget).attr("data-value4");
		if (action === "message") {
			var messageCardTemplate = _.template(messageCardMarkup);
			this.$el.find(".profiles-action-area").html(messageCardTemplate(profileJSON));
		} else if (action === "add_to_favorites") {
			var addToFavoritesTemplate = _.template(addToFavoritesMarkup);
			this.$el.find(".profiles-action-area").html(addToFavoritesTemplate(profileJSON));
		} else if (action === "send_web_request") {
			var sendWebRequestTemplate = _.template(sendWebRequestMarkup);
			this.$el.find(".profiles-action-area").html(sendWebRequestTemplate(profileJSON));
		} else {
			var viewProfileTemplate = _.template(viewProfileMarkup);
			this.$el.find(".profiles-action-area").html(viewProfileTemplate(profileJSON));
		}
		
		return true;
	},
	addUserToFavorites: function(ev) {
		var addUserToFavoritesData = $(ev.currentTarget).serializeObject();
		var favoriteUser = new FavoriteUser();
		var view = this;
		favoriteUser.save(addUserToFavoritesData, {
			success: function() {
				console.log("added user to favorites");
				var addToFavoritesSucessTemplate = _.template(addToFavoritesSuccessMarkup);
				view.$el.find(".profiles-action-area").html(addToFavoritesSucessTemplate(addUserToFavoritesData));
			}
		});
		return false;
	}
});

export default {
	FindPeople: FindPeople
}