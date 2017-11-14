var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var Router = Backbone.Router.extend({
	routes: {
		"": "profile",
		"profile": "profile",
		"people": "people",
		"groups": "groups",
		"messages": "messages",
		"email": "email",
		"chat_rooms": "chatRooms",
		"requests": "requests"
	}
});



var profileController = require("profile/controller").default.controller;
var peopleController = require("people/controller").default.controller;
var chatRoomController = require("chat_rooms/controller").default.controller;
var mainController = require("main/controller").default.controller;
mainController.main();

var router = new Router();
router.on("route:profile", function() {
	console.log("will render profile view");
	profileController.profile();
});
router.on("route:people", function() {
	console.log("will render people view");
	peopleController.people();
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
	chatRoomController.chatRooms();
});
router.on("route:requests", function() {
	console.log("will render requests view");
});

Backbone.history.start();