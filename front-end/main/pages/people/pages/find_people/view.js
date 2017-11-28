var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var Profiles = require("main/pages/people/pages/find_people/model").default.Profiles;
import findPeopleMarkup from "main/pages/people/pages/find_people/partials/find_people-page-template.htm"

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
		"submit .search-people-form": "findPeople"
	},
	findPeople: function(ev) {
		var searchText = $(ev.currentTarget).serializeObject().search_text;
		var profiles = new Profiles({id: searchText});
		profiles.fetch({
			success: function(_profiles) {
				console.log(_profiles);
			}
		});
		return false;
	}
});

export default {
	FindPeople: FindPeople
}