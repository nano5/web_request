var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var FavoritesByCategory = Backbone.Model.extend({
	url: global.base_url + "favorites/my_favorites"
});

var Profiles = Backbone.Collection.extend({
	url: global.base_url + "favorites/profiles"
});

var AddCategory = Backbone.Model.extend({
	url: global.base_url + "favorites/add_category"
});

export default {
	FavoritesByCategory: FavoritesByCategory,
	Profiles: Profiles,
	AddCategory: AddCategory
}