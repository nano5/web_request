var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Profile = Backbone.Model.extend({
	urlRoot: global.base_url + "people/my_profile/"
});

export default {
	Profile:Profile
}