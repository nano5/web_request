var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Favorites = Backbone.Model.extend({
	url: global.base_url + "favorites/my_favorites"
});

var Profiles = Backbone.Collection.extend({
	url: global.base_url + "people/profiles"
});

export default {
	Favorites: Favorites,
	Profiles: Profiles
}