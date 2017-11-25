var User = require("../models/user").User;

function Controller(){};

Controller.prototype.get_people_profile = function(req, res) {
	if (req.session.loggedIn === true) {
		// need to send some data back depending on username
		var _username = req.params.username;
		
		console.log(_username);
		User.findOne({username: _username}, "first_name last_name email username profile.bio", 
			function(err, user) {
			if (err) {
				console.log(err);
				res.setHeader("Content-Type", "application/json");
				var errJSON = {error: err};
				res.send(JSON.stringify(errJSON));
				res.end();
			} else {
				if (user) {
					var profileJSON = {
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						username: _username,
						bio: user.profile.bio
					};

					res.setHeader("Content-Type", "application/json");
					res.send(profileJSON);
					res.end();
				} else {
					res.sendStatus(404);
					res.end();
				}
			}
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

Controller.prototype.get_people_my_profile = function(req, res) {
	if (req.session.loggedIn === true) {
		// need to send some data back depending on username
		var _username = req.session.username;
		
		User.findOne({username: _username}, "first_name last_name email username profile.bio", 
			function(err, user) {
			if (err) {
				console.log(err);
				res.setHeader("Content-Type", "application/json");
				var errJSON = {error: err};
				res.send(JSON.stringify(errJSON));
				res.end();
			} else {
				if (user) {
					var profileJSON = {
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						username: _username,
						bio: user.profile.bio
					};

					res.setHeader("Content-Type", "application/json");
					res.send(profileJSON);
					res.end();
				} else {
					res.sendStatus(404);
					res.end();
				}
			}
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

var _controller = new Controller();
module.exports = {controller: _controller};