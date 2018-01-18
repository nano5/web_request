var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var FavoritesByCategory = Backbone.Collection.extend({
	url: global.base_url + "favorites/my_favorites"
});

var Profiles = Backbone.Collection.extend({
	url: global.base_url + "favorites/profiles"
});

export default {
	FavoritesByCategory: FavoritesByCategory,
	Profiles: Profiles
}