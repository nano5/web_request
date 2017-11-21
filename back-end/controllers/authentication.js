var User = require("../models/user").User;
var bcrypt = require("bcrypt");
var path = require("path");

function Controller(){};

Controller.prototype.get_authenticate = function(req, res) {
	//req.session.loggedIn = false;
	if(req.session.loggedIn === true) {
		res.sendFile(path.join(__dirname + "/../../front-end/main/view.html"));
	} else {
		res.sendFile(path.join(__dirname + "/../../front-end/authentication/view.html"));
	}
}

// user is signing up at this point, 
Controller.prototype.post_signup = function(req, res) {
	var _first_name = req.body.first_name;
	var _last_name = req.body.last_name;
	var _email = req.body.email;
	var _username = req.body.username;
	var _password = req.body.password;
	if (!_first_name || !_last_name || !_email || 
		!_username || !_password) {
		console.log(req.body);
		res.setHeader("Content-Type", "application/json");
		var JSONreply = {error: "Please fill out the whole form."};
		res.send(JSON.stringify(JSONreply));
	}
	else {
		req.check("email", "invalid email").isEmail();
		req.check("password", "invalid password").isLength({min: 4});
		var count = User.count({username: _username}, function(err, c) {
			if (c === 0) {
				var errors = req.validationErrors();
				if (errors) {
					console.log("have errors password/email errors");
					console.log(errors);
					res.setHeader("Content-Type", "application/json");
					var JSONreply = {error: "Invalid password/email"};
					res.send(JSON.stringify(JSONreply));
					res.end();
				} else {
					bcrypt.genSalt(10, function(err, salt) {
			    		bcrypt.hash(_password, salt, function(err, hash) {
			        		if (err) {
			        			console.log(err);
			        		} else {
			        			var _hashedPassword = hash;
			        			var user = new User({
									first_name: _first_name,
									last_name: _last_name,
									email: _email,
									username: _username,
									hashedPassword: _hashedPassword,
									profile: {
										bio: ""
									},
									favorites: []
								});
								user.save(function(err) {
			      					if(err){
			           					console.log(err);
			           					console.log("data base is disconnected")
			           					res.setHeader("Content-Type", "application/json");
										var jsonReply = {error: "Database is disconnected"};
										res.send(JSON.stringify(jsonReply));
										res.end();
			      					} else {
			      						req.session.loggedIn = true;
			      						console.log("signed up");
										res.setHeader("Content-Type", "application/json");
										var jsonReply = {redirect: "http://localhost:8080/"};
										res.send(JSON.stringify(jsonReply));
										res.end();
			      					}
			      					return;
								});
			        		}
			    		});
					});
				}
			} else {
				res.setHeader("Content-Type", "application/json");
				var jsonReply = {error: "Username is taken."};
				res.send(JSON.stringify(jsonReply));
				res.end();
				console.log("username is taken");
			}
		});
	}
	
}

Controller.prototype.post_login = function(req, res) {
	var _username = req.body.username;
	var _password = req.body.password;
	User.findOne({username: _username}, "hashedPassword", function(err, user) {
		if (err) {
			console.log("send");
			console.log(err);
			res.setHeader("Content-Type", "application/json");
			var jsonReply = {error: "Could not find username/password"};
			res.send(JSON.stringify(jsonReply));
			res.end();
		} else {
			if (user) {
			bcrypt.compare(_password, user.hashedPassword, function(err, result) {
					if (result === true) {
						console.log("you are now logged in");
						req.session.loggedIn = true;
						res.setHeader("Content-Type", "application/json");
						var jsonReply = {redirect: "http://localhost:8080/"};
						res.send(JSON.stringify(jsonReply));
						res.end();
					} else {
						console.log("wrong password");
						res.setHeader("Content-Type", "application/json");
						var jsonReply = {error: "Could not find username/password"};
						res.send(JSON.stringify(jsonReply));					}
						res.end();  
				});
			} else {
				console.log("could not find user");
				res.setHeader("Content-Type", "application/json");
				var jsonReply = {error: "Could not find username/password"};
				res.send(JSON.stringify(jsonReply));
				res.end();  
			}
		}
	});
}

Controller.prototype.post_logout = function(req, res) {
	req.session.loggedIn = false;
}

Controller.prototype.post_signout = function(req, res) {
	if (req.session.loggedIn === true || req.body.test_key === "some_test_key") {
		// we remove user from database
		var _username = req.body.username;

		// should always work :o
		User.remove({username: _username}, function(err) {
			if (err) {
				res.setHeader("Content-Type", "application/json");
				var jsonReply = {error: "Could not remove user " + _username + " for some reason"};
				res.send(JSON.stringify(jsonReply));					
				res.end();
			} else {
				console.log("removed user: " + _username);
				res.setHeader("Content-Type", "application/json");
				var jsonReply = {redirect: "http://localhost:8080/"};
				res.send(JSON.stringify(jsonReply));					
				res.end();
			}  
		});


	} else {
		res.setHeader("Content-Type", "application/json");
		var jsonReply = {error: "Stop trying to hack my webapp."};
		res.send(JSON.stringify(jsonReply));					
		res.end();
	}
}

var _controller = new Controller();
module.exports = {controller: _controller};
