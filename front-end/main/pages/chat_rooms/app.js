var controller = require("main/pages/chat_rooms/controller").default.controller;
function App(){};
App.prototype.start = function() {
	controller.chatRooms();
}

var app = new App();

export default {
	app:app
}