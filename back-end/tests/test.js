var request = require("request");
var assert = require("assert");
var base_url = "http://localhost:8080/";
var User = require("../models/user");

describe("GET /", function() {
	it("make sure server is up", function(done) {
		request.get(base_url, function(error, response, body) {
			assert.equal(200, response.statusCode);
		});
	done();
	});
});

describe("POST /signup and /signout", function() {
	it("make sure signing in and out works", function(done) {
		var signupJSON = {
			"first_name": "test",
    		"last_name": "test",
    		"email": "test@example.com",
    		"username": "test",
    		"password": "password"
		}
		request.post({
  			uri: base_url + "signup",
  			method: "POST",
  			json: signupJSON
		},
		function(error, response, body) {
			assert.equal(200, response.statusCode);
			assert.equal(response.body.redirect, base_url);
			var signoutJSON = {
				"username": "test",
				"test_key": "some_test_key"
			};
			request.post({
				uri: base_url + "signout",
				method: "POST",
				json: signoutJSON
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				assert.equal(response.body.redirect, base_url);
				done();
			});
		});
	});
});

describe("POST /login and /logout", function () {
	it("make sure login and logout works", function(done) {
		var signupJSON = {
			"first_name": "test",
    		"last_name": "test",
    		"email": "test@example.com",
    		"username": "test",
    		"password": "password"
		}
		request.post({
  			uri: base_url + "signup",
  			method: "POST",
  			json: signupJSON
		},
		function(error, response, body) {
			assert.equal(200, response.statusCode);
			assert.equal(response.body.redirect, base_url);
			var loginJSON = {
				"username": "test",
				"password": "password"
			};
			request.post({
				uri: base_url + "login",
				method: "POST",
				json: loginJSON
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				assert.equal(response.body.redirect, base_url);
				var logoutJSON = {
					"username": "test",
					"test_key": "some_test_key"
				};
				request.post({
					uri: base_url + "logout",
					method: "POST",
					json: logoutJSON
				},
				function(error, response, body) {
					assert.equal(200, response.statusCode);
					assert.equal(response.body.redirect, base_url);
					var signoutJSON = {
						"username": "test",
						"test_key": "some_test_key"
					};
					request.post({
						uri: base_url + "signout",
						method: "POST",
						json: signoutJSON
					},
					function(error, response, body) {
						assert.equal(200, response.statusCode);
						assert.equal(response.body.redirect, base_url);
						done();
					});
				});
			});
		});
	});
});	