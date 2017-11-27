var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import findPeopleMarkup from "main/pages/people/pages/find_people/partials/find_people-page-template.htm"

var FindPeople = Backbone.View.extend({
	el: ".people-content",
	render: function(FindPeople) {
		var template = _.template(findPeopleMarkup);
		this.$el.html(template({}));
	}
});

export default {
	FindPeople: FindPeople
}