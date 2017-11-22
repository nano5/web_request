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
			var cookie = response.headers['set-cookie'].pop().split(';')[0];
			console.log(cookie);
			var signoutJSON = {
				"password": "password"
			};
			request.post({
				uri: base_url + "signout",
				headers: {Cookie: cookie},
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
			var signupCookie = response.headers['set-cookie'].pop().split(';')[0];
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
				var loginCookie = response.headers['set-cookie'].pop().split(';')[0];
				var logoutJSON = {
					"username": "test"
				};
				request.post({
					uri: base_url + "logout",
					headers: {Cookie: loginCookie},
					method: "POST",
					json: logoutJSON
				},
				function(error, response, body) {
					assert.equal(200, response.statusCode);
					assert.equal(response.body.redirect, base_url);
					var signoutJSON = {
						"username": "test"
					};
					request.post({
						uri: base_url + "signout",
						headers: {Cookie: signupCookie},
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

// describe("POST /")

// describe("GET /people/username", function() {
// 	it("fetching user profile", function(done) {
// 		var getUsernameJSON = {
// 			"username": "test"
// 		};
// 		request.get({
// 			uri: base_url + "people/username",
// 			method: "GET",
// 			json: getUsernameJSON
// 		},
// 		function(error, response, body){
// 			assert.equal(200, response.statusCode);
// 			assert.equal(response.body.username, "test");
// 			assert.equal(response.body.bio, "A small boy raised on a farm.");
// 			done();
// 		});
// 	});
// });

