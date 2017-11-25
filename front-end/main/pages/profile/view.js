var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import profileMarkup from 'main/pages/profile/partials/profile-page-template.htm'
import editProfileMarkup from "main/pages/profile/partials/profile_edit-page-template.htm"

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


var Profile = Backbone.View.extend({
	el: ".content",
	initialize: function(options) {
		this.options = options;
	},
	render: function() {
		var profile = new this.options.Profile();
		var view = this;
		profile.fetch({
			success: function(_user) {
				var template = _.template(profileMarkup);
				view.$el.html(template({user: _user}));
			}
		});	
	},
	events: {
		"click #edit": "editProfile",
		"submit .submit-profile": "saveProfile"
	},
	editProfile: function() {
		var profile = new this.options.Profile();
		var view = this;
		profile.fetch({
			success: function(_user) {
				var template = _.template(editProfileMarkup);
				view.$el.html(template({user: _user}));
			}
		});
		return false;
	},
	saveProfile: function(ev) {
		var profileDetails = $(ev.currentTarget).serializeObject();
		var view = this;
		var profile = new this.options.Profile(profileDetails);
		profile.save(null, {
			success: function(_user) {
				if (_user.attributes.error) {
					alert(_user.attributes.error);
				} else {
					var template = _.template(profileMarkup);
					view.$el.html(template({user: _user}));
				}
			}
		});
		return false;
	}
});

export default {
	Profile:Profile
}