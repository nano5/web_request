var User = require("../models/user").User;
var bcrypt = require("bcrypt");
var path = require("path");


function Controller(){};

Controller.prototype.get_people_profiles = function(req, res) {
	if (req.session.loggedIn === true) {
		var queryString = req.query.queryString;
		var query = User.find({$or: [{"first_name": queryString}, {"last_name": queryString}, 
			      {"username": queryString}]}).
		select("first_name last_name username email -_id").
		where("username").ne(req.session.username);

		query.exec(function(err, result) {
			res.setHeader("Content-Type", "application/json");
			res.send(result);
			res.end();
		});
	} else {
		res.sendStatus(404);
		res.end();
	}
}

var _controller = new Controller();

module.exports = {controller: _controller};