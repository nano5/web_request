var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var mainController = require("main/controller").default.controller;

var profileApp = require("main/pages/profile/app").default.app;
var peopleApp = require("main/pages/people/app").default.app;
var chatRoomsApp = require("main/pages/chat_rooms/app").default.app;
var emailApp = require("main/pages/email/app").default.app;
var messagesApp = require("main/pages/messages/app").default.app;
var groupsApp = require("main/pages/groups/app").default.app;
var requestsApp = require("main/pages/requests/app").default.app;

var Router = Backbone.Router.extend({
	routes: {
		"": "redirectToProfile",
		"profile": "profile",
		"people": "people",
		"groups": "groups",
		"messages": "messages",
		"email": "email",
		"chat_rooms": "chatRooms",
		"requests": "requests"
	},
	redirectToProfile: function() {
		this.navigate("profile", {trigger: true});
	},
	profile: function() {
		console.log("will render profile view");
		$(".active").toggleClass("active");
		$("#menu-profile").toggleClass("active");
		profileApp.start()
	},
	people: function() {
		console.log("will render people view");
		$(".active").toggleClass("active");
		$("#menu-people").toggleClass("active");
		peopleApp.start();
	},
	groups: function() {
		console.log("will render groups view");
		$(".active").toggleClass("active");
		$("#menu-groups").toggleClass("active");
		groupsApp.start();
	},
	messages: function() {
		console.log("will render messages view");
		$(".active").toggleClass("active");
		$("#menu-messages").toggleClass("active");
		messagesApp.start();
	},
	email: function() {
		console.log("will render email view");
		$(".active").toggleClass("active");
		$("#menu-email").toggleClass("active");
		emailApp.start();
	},
	chatRooms: function() {
		console.log("will render chatRooms view");
		$(".active").toggleClass("active");
		$("#menu-chat_rooms").toggleClass("active");
		chatRoomsApp.start();
	},
	requests: function() {
		console.log("will render requests view");
		$(".active").toggleClass("active");
		$("#menu-requests").toggleClass("active");
		requestsApp.start();
	}

});

export default {
	Router:Router
}