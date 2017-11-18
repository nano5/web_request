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
		//res.redirect("localhost:8080/#/login");
	}
}

// user is signing up at this point, 
Controller.prototype.post_signup = function(req, res) {
	var _first_name = req.body.first_name;
	var _last_name = req.body.last_name;
	var _email = req.body.email;
	var _username = req.body.username;
	var _password = req.body.password;
	req.check("email", "invalid email").isEmail();
	req.check("password", "invalid password").isLength({min: 4});
	var count = User.count({username: _username}, function(err, c) {
		if (c === 0) {
			var errors = req.validationErrors();
			if (errors) {
				console.log("have errors password/email errors");
				console.log(errors);
				res.send(400);
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
								hashedPassword: _hashedPassword
							});
							user.save(function(err) {
		      					if(err){
		           					console.log(err);
		           					return;
		      					}
							});
		        		}
		    		});
				});
			}
		} else {
			res.send(400);
			console.log("username is taken");
		}
	});
	
	res.end();
}

Controller.prototype.post_login = function(req, res) {
	var _username = req.body.username;
	var _password = req.body.password;
	User.findOne({username: _username}, "hashedPassword", function(err, user) {
		if (err) {
			console.log("send");
			console.log(err);
			res.sendStatus(400);
			res.end();
		} else {
			if (user) {
			bcrypt.compare(_password, user.hashedPassword, function(err, result) {
					if (result === true) {
						console.log("you are now logged in");
						req.session.loggedIn = true;
						// need to redirect
						//res.redirect("http://localhost:8080/");
						//res.sendFile(path.join(__dirname + "/../../front-end/main/view.html"));
						//res.sendStatus(200);
						res.send({});
					} else {
						console.log("wrong password");
						res.sendStatus(400);
					}
					res.end();  
				});
			} else {
				console.log("could not find user");
				res.sendStatus(400);
				res.end();  
			}
		}
	});
}

var _controller = new Controller();
module.exports = {controller: _controller};
