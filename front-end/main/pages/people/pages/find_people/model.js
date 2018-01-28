var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Profiles = Backbone.Collection.extend({
	url: global.base_url + "people/profiles"
});

var FavoriteUser = Backbone.Model.extend({
	url: global.base_url + "favorites/add_user"
});

var Categories = Backbone.Model.extend({
	url: global.base_url + "favorites/categories"
});

var SendMessage = Backbone.Model.extend({
	url: global.base_url + "messages/send_message"
});

export default {
	Profiles: Profiles,
	FavoriteUser: FavoriteUser,
	Categories: Categories,
	SendMessage: SendMessage
}