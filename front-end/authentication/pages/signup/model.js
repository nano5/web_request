var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var User = Backbone.Model.extend({
	url: "http://localhost:8080/signup"
});

export default {
	User:User
}