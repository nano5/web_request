var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var Profiles = Backbone.Model.extend({
	urlRoot: global.base_url + "people/profiles"
});

export default {
Profiles: Profiles
}