var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var profileApp = require("main/pages/profile/app").default.app;
var peopleApp = require("main/pages/people/app").default.app;
var chatRoomsApp = require("main/pages/chat_rooms/app").default.app;
var emailApp = require("main/pages/email/app").default.app;
var messagesApp = require("main/pages/messages/app").default.app;
var groupsApp = require("main/pages/groups/app").default.app;
var requestsApp = require("main/pages/requests/app").default.app;

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
	},
	profile: function() {
		console.log("will render profile view");
		profileApp.start()
	},
	people: function() {
		console.log("will render people view");
		peopleApp.start();
	},
	groups: function() {
		console.log("will render groups view");
		groupsApp.start();
	},
	messages: function() {
		console.log("will render messages view");
		messagesApp.start();
	},
	email: function() {
		console.log("will render email view");
		emailApp.start();
	},
	chatRooms: function() {
		console.log("will render chatRooms view");
		chatRoomsApp.start();
	},
	requests: function() {
		console.log("will render requests view");
		requestsApp.start();
	}

});

export default {
	Router:Router
}