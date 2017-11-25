var User = require("../models/user").User;

function Controller(){};

Controller.prototype.get_people_profile = function(req, res) {
	if (req.session.loggedIn === true) {
		// need to send some data back depending on username
		var _username = req.params.username;
		
		console.log(_username);
		User.findOne({username: _username}, "first_name last_name email username profile.bio _id", 
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
						bio: user.profile.bio,
						id: user._id
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
		User.findOne({username: _username}, "first_name last_name email username profile.bio _id", 
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
						bio: user.profile.bio,
						id: user._id
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

Controller.prototype.put_people_my_profile = function(req, res) {
	if (req.session.loggedIn === true) {
		//at this point look at the data sent,
		var _first_name = req.body.first_name;
		var _last_name = req.body.last_name;
		var _username = req.body.username;
		var _email = req.body.email;
		var _bio = req.body.bio;
		var _id = req.params.id;
		// grab the model by username stored in session,
		// if the username has not changed, then update everything else
		//console.log(_username);
		//console.log(req.session.username);
		if (_username === req.session.username) {
			User.findById(_id, function(err, user) {
				if (err) {
					console.log(err);
					res.sendStatus(404);
					res.end();
				}
				else {
					user.set({
						first_name: _first_name,
						last_name: _last_name,
						username: _username,
						email: _email,
						profile: {
							bio: _bio
						}
					});
					user.save(function(err, updatedUser) {
						if (err) {
							console.log(err);
							res.sendStatus(404);
							res.end();
						} else {
							res.setHeader("Content-Type", "application/json");
							res.send(updatedUser);
							res.end();
						}
					});
				}
			});
		} else {
			console.log("user name has changed");

		}
		// if the username has changed, make sure it is not taken
	} else {	
		res.sendStatus(404);
		res.end();
	}
}

var _controller = new Controller();
module.exports = {controller: _controller};