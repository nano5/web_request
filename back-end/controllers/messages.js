var User = require("../models/user").User;

function Controller(){};

Controller.prototype.post_messages_send_message = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		var _other_username = req.body.other_username;
		var _message = req.body.message;
		User.findOne({username: _other_username}).select("_id conversations").lean().exec(function(err, other_user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				var sortedUsername = sortUsernames(_username, _other_username);
				var conversation_key = sortedUsername[0] + sortedUsername[1];
				var _timestamp = Date.now();
				if (other_user.conversations[conversation_key] == null) {
					other_user.conversations[conversation_key] = {
						other_username: _username,
						recieved_messages: [{
							message: _message,
							timestamp: _timestamp
						}]
					}
				} else {
					other_user.conversations[conversation_key].recieved_messages.push({
						message: _message,
						timestamp: _timestamp
					});
				}
				User.update({_id: other_user._id}, other_user, function(err) {
					if (err) {
						console.log(err);
						res.sendStatus(404);
						res.end();
					} else {
						res.sendStatus(200);
						res.end();
					}
				});
			}
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

function sortUsernames(username1, username2) {
	var sortedUsernames = [];
	if (username1 < username2) {
		sortedUsernames.push(username1);
		sortedUsernames.push(username2);
	} else {
		sortedUsernames.push(username2);
		sortedUsernames.push(username1);
	}
	return sortedUsernames;
}
var _controller = new Controller();

module.exports = {controller: _controller};