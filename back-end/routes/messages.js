var _messagesRouter = require("express").Router();
var messagesController = require("../controllers/messages").controller;

_messagesRouter.post("/messages/send_message", messagesController.post_messages_send_message);

module.exports = { messagesRouter: _messagesRouter };