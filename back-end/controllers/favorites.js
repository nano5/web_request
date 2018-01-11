var User = require("../models/user").User;

function Controller(){};

Controller.prototype.post_favorites_add_user = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		var _other_username = req.body.other_username;
		var _category = req.body.category;
		User.findOne({username: _username}, "favorites_by_category _id", function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();	
			} else {
				User.findOne({username: _other_username}, "_id", function(err, other_user) {
					if (err) {
						console.log(err);
						res.sendStatus(404);
						res.end();
					} else {
						if (other_user) {
							var foundCategory = false;
							for (var i = 0; i < user.favorites_by_category.length; ++i) {
								if (user.favorites_by_category[i].category === _category) {
									user.favorites_by_category[i].favorites.push(other_user._id);
									user.save(function(err) {
										if (err) {
											console.log(err);
											res.sendStatus(404);
											res.end();
										} else {
											res.sendStatus(200);
											res.end();
										}
									});
									foundCategory = true;
									break;
								}
							}

							if (!foundCategory) {
								console.log("could not find category");
								res.sendStatus(404);
								res.end();
							}
						} else {
							console.log("the user you are trying to add doesn't exist");
							res.sendStatus(404);
							res.end();
						}
					}
				});
			}
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

Controller.prototype.post_favorites_add_category = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		var _category = req.body.category;
		User.findOne({username: _username}, "favorites_by_category", function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				user.favorites_by_category.push({
					category: _category,
					favorites: []
				});
				user.save(function(err) {
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

var _controller = new Controller();

module.exports = {controller: _controller};