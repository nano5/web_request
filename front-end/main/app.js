var $ = require("../../back-end/node_modules/jquery");
var _ = require("../../back-end/node_modules/underscore");
var Backbone = require("../../back-end/node_modules/backbone");
var Router = Backbone.Router.extend({
	routes: {
		"": "profile",
		"profile": "profile",
		"friends": "friends",
		"groups": "groups",
		"messages": "messages",
		"email": "email",
		"chat_rooms": "chatRooms",
		"requests": "requests"
	}
});

var router = new Router();
router.on("route:profile", function() {
	console.log("will render profile view");
});
router.on("route:friends", function() {
	console.log("will render friends view");
});
router.on("route:groups", function() {
	console.log("will render groups view");
});
router.on("route:messages", function() {
	console.log("will render messages view");
});
router.on("route:email", function() {
	console.log("will render email view");
});
router.on("route:chatRooms", function() {
	console.log("will render chatRooms view");
});
router.on("route:requests", function() {
	console.log("will render requests view");
});

var controller = require("./controller").default.controller;
controller.index();
Backbone.history.start();