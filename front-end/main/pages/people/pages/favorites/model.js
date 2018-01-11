var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Profiles = Backbone.Collection.extend({
	url: global.base_url + "people/profiles"
});

var Favorites = Backbone.Collection.extend({
	url: global.base_url + "people/favorites"
})

export default {
	Profiles: Profiles,
	Favorites: Favorites
}