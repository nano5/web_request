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



var profileApp = require("profile/app").default.app;
var peopleApp = require("people/app").default.app;
var chatRoomsApp = require("chat_rooms/app").default.app;
var emailApp = require("email/app").default.app;
var messagesApp = require("messages/app").default.app;
var groupsApp = require("groups/app").default.app;
var requestsApp = require("requests/app").default.app;
var mainController = require("main/controller").default.controller;
mainController.main();

var router = new Router();
router.on("route:profile", function() {
	console.log("will render profile view");
	profileApp.start();
});
router.on("route:people", function() {
	console.log("will render people view");
	peopleApp.start();
});
router.on("route:groups", function() {
	console.log("will render groups view");
	groupsApp.start();
});
router.on("route:messages", function() {
	console.log("will render messages view");
	messagesApp.start();
});
router.on("route:email", function() {
	console.log("will render email view");
	emailApp.start();
});
router.on("route:chatRooms", function() {
	console.log("will render chatRooms view");
	chatRoomsApp.start();
});
router.on("route:requests", function() {
	console.log("will render requests view");
	requestsApp.start();
});

Backbone.history.start();