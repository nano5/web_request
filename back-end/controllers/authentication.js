var User = require("../models/user").User;
var bcrypt = require("bcrypt");

function Controller(){};

Controller.prototype.get_authenticate = function(req, res) {
	if(req.session.signedIn === true) {
		res.sendFile(path.join(__dirname + "/../front-end/main/view.html"));
	} else {
		// at this point send the login/signup application
	}
}

// user is signing up at this point, 
Controller.prototype.post_signup = function(req, res) {
	var _first_name = req.body.first_name;
	var _last_name = req.body.last_name;
	var _email = req.body.email;
	var _username = req.body.username;
	var _password = req.body.password;
	// at this point need to check if the username is taken.

	//req.check("email", "invalid email").isEmail();
	req.check("password", "invalid password").isLength({min: 4});
	var count = User.count({username: _username}, function(err, c) {
		if (c === 0) {
			var errors = req.validationErrors();
			if (errors) {
				// at this point need to redirect to the signup page, 
				// maybe send a message
				console.log("have errors");
				console.log(errors);
			} else {
				// at this point need to set signedIn to true
				// and redirect to the root /, where the 
				// back-end will send over the frontend,
				// application
				bcrypt.genSalt(10, function(err, salt) {
		    		bcrypt.hash(_password, salt, function(err, hash) {
		        	// Store hash in your password DB.
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
							// say the user has signed in
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
			console.log(err);

		} else {
			bcrypt.compare(_password, user.hashedPassword, function(err, res) {
				if (res === true) {
					console.log("you are now logged in");
				} else {
					console.log("wrong password");
				}
			});
		}
	});
	res.end();

}

var _controller = new Controller();
module.exports = {controller: _controller};
