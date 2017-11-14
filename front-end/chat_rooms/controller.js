var model = require("chat_rooms/model");
var view = require("chat_rooms/view");

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

function Controller(){};

Controller.prototype.chatRooms = function() {
	var chatRooms = new view.default.ChatRooms();
	chatRooms.render(model.default.ChatRooms);
}

var controller = new Controller();

export default {
	controller:controller
}