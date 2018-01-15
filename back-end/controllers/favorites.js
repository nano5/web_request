var User = require("../models/user").User;

function Controller(){};

Controller.prototype.post_favorites_add_user = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		var _other_username = req.body.other_username;
		var _category = req.body.category;
		User.findOne({username: _username}).select("favorites_by_category _id").lean().exec(function(err, user) {
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
							if (user.favorites_by_category[_category]) {
								if (!idInArray(other_user._id, user.favorites_by_category[_category])) {
									user.favorites_by_category[_category].push(other_user._id);
									User.update({_id: user._id}, user, function(err) {
										if (err) {
											console.log(err);
											res.sendStatus(404);
											res.end();
										} else {
											res.setHeader("Content-Type", "application/json");
											res.send({});
											res.end();
										}
									});

								} else {
									console.log("user is already in category " + _category);
									res.sendStatus(400);
									res.end();
								}
							} else {
								console.log("here! could not find category " + _category);
								res.sendStatus(404);
								res.end();
							}
						} else {
							console.log(_other_username + " does not exist.");
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

Controller.prototype.delete_favorites_remove_user = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		var _other_username = req.body.other_username;
		var _category = req.body.category;
		User.findOne({username: _username}).select("favorites_by_category").lean().exec(function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				if (user) {
					User.findOne({username: _other_username}, "_id", function(err, other_user) {
						if (err) {
							console.log(err);
							res.sendStatus(404);
							res.end();
						} else {
							if (other_user) {
								if (user.favorites_by_category[_category]) {
									var index = idInArray(other_user._id, user.favorites_by_category[_category]);

									if (index >= 0) {
										user.favorites_by_category[_category].splice(index, 1);
										User.update({_id: user._id}, user, function(err) {
											if (err) {
												console.log(err);
												res.sendStatus(404);
												res.end();
											} else {
												res.setHeader("Content-Type", "application/json");
												res.send({});
												res.end();
											}
										});
									} else {
										console.log("could not find user " + _other_username);
										res.sendStatus(400);
										res.end();
									}
								} else {
									console.log("could not find category " + "_category");
									res.sendStatus(400);
									res.end();
								}

							} else {
								console.log(_other_username + " does not exist");
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

		User.findOne({username: _username}).select("favorites_by_category _id").lean().exec( function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				user.favorites_by_category[_category] = [];
				User.update({_id: user._id}, {$set: user}, function(err) {
					if (err) {
						console.log(err);
						res.sendStatus(400);
						res.end();
					} else {
						res.setHeader("Content-Type", "application/json");
						res.send({});
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

Controller.prototype.delete_favorites_remove_category = function(req, res) {
	if (req.session.loggedIn === true && req.body.category !== "generic") {
		var _username = req.session.username;
		var _category = req.body.category;

		User.findOne({username: _username}).select("favorites_by_category _id").lean().exec(function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				if (user.favorites_by_category[_category]) {
					user.favorites_by_category[_category] = null;
					User.update({_id: user._id}, user, function(err) {
						if (err) {
							res.sendStatus(404);
							res.end()
						} else {
							res.setHeader("Content-Type", "application/json");
							res.send({});
							res.end();
						}
					});
				} else {
					console.log("could not find category " + _category);
					res.sendStatus(400);
					res.end();
				}

			}
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

Controller.prototype.get_favorites_my_favorites = function(req, res) {
	if (req.session.loggedIn === true) {
		var _username = req.session.username;
		User.findOne({username: _username}, function(err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
				res.end();
			} else {
				if (user) {
					res.setHeader("Content-Type", "application/json");
					res.send(user.favorites_by_category);
					res.end();
				} else {
					console.log("user " + _username + " does not exist");
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

function idInArray(id, array) {
	for (var i = 0; i < array.length; ++i) {
		if (id == array[i]) {
			return true;
		}
	}
	return false;
}

function idIndexInArray(id, array) {
	for (var i = 0; i < array.length; ++i) {
		if (id == array[i]) {
			return i;
		}
	}
	return -1;
}

var _controller = new Controller();

module.exports = {controller: _controller};