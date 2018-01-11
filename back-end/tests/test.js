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
			assert.equal(response.body.username, "test");
			var cookie = response.headers['set-cookie'].pop().split(';')[0];
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
			assert.equal(response.body.username, "test");
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
				assert.equal(response.body.username, "test");
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

describe("GET /people/profile/username", function () {
	it("make sure I can get profile information with username", function(done) {
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
			assert.equal(response.body.username, "test");
			request.get({
				uri: base_url + "people/profile/test",
				headers: {Cookie: signupCookie},
				method: "GET",
				json: {}
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				assert.equal("test", response.body.first_name);
				assert.equal("test", response.body.last_name);
				assert.equal("test@example.com", response.body.email);
				assert.equal("test", response.body.username);
				var signoutJSON = {
					password: "password"
				}
				request.post({
					uri: base_url + "signout",
					headers: {Cookie: signupCookie},
					method: "POST",
					json: {}
				},
				function(error, response, body) {				
					assert.equal(200, response.statusCode);
					assert.equal(base_url, response.body.redirect);
					done();
				});
			});
		});
	});
});

describe("GET /people/profile/", function () {
	it("make sure I can get profile information without username", function(done) {
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
			assert.equal(response.body.username, "test");
			request.get({
				uri: base_url + "people/my_profile/",
				headers: {Cookie: signupCookie},
				method: "GET",
				json: {}
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				assert.equal("test", response.body.first_name);
				assert.equal("test", response.body.last_name);
				assert.equal("test@example.com", response.body.email);
				assert.equal("test", response.body.username);
				var signoutJSON = {
					password: "password"
				}
				request.post({
					uri: base_url + "signout",
					headers: {Cookie: signupCookie},
					method: "POST",
					json: {}
				},
				function(error, response, body) {				
					assert.equal(200, response.statusCode);
					assert.equal(base_url, response.body.redirect);
					done();
				});
			});
		});
	});
});


describe("PUT people/my_profile", function() {
	it("going to update everything but username and make sure it works", function(done) {
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
			assert.equal(base_url, response.body.redirect);
			var signupCookie = response.headers['set-cookie'].pop().split(';')[0];
			request.get({
				uri: base_url + "people/my_profile",
				method: "GET",
				headers: {Cookie: signupCookie},
				json: {}
			},
			function(error, response, body) {
				assert.equal("test", response.body.first_name);
				assert.equal("test", response.body.last_name);
				assert.equal("test@example.com", response.body.email);
				assert.equal("test", response.body.username);
				var userID = response.body.id;
				var updateJSON = {
					"first_name": "hello",
					"last_name": "hello",
					"username": "test",
					"email": "hello@example.com",
					"bio": "A boy raised on a farm.",
					"id": userID
				}

				request.put({
					uri: base_url + "people/my_profile/" + userID,
					method: "PUT",
					headers: {Cookie: signupCookie},
					json: updateJSON
				},
				function(error, response, body) {
					assert.equal(200, response.statusCode);
					assert.equal("hello", response.body.first_name);
					assert.equal("hello", response.body.last_name);
					assert.equal("test", response.body.username);
					assert.equal("hello@example.com", response.body.email);
					assert.equal("A boy raised on a farm.", response.body.bio);
					request.post({
						uri: base_url + "signout",
						method: "POST",
						headers: {Cookie: signupCookie},
						json: {}
					},
					function(error, response, body) {
						assert.equal(200, response.statusCode);
						assert.equal(base_url, response.body.redirect);
						done();
					});
				});
			});
		});

	});
});

describe("PUT people/my_profile", function() {
	it("going to update everything and username and make sure it works", function(done) {
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
			assert.equal(base_url, response.body.redirect);
			var signupCookie = response.headers['set-cookie'].pop().split(';')[0];
			request.get({
				uri: base_url + "people/my_profile",
				method: "GET",
				headers: {Cookie: signupCookie},
				json: {}
			},
			function(error, response, body) {
				assert.equal("test", response.body.first_name);
				assert.equal("test", response.body.last_name);
				assert.equal("test@example.com", response.body.email);
				assert.equal("test", response.body.username);
				var userID = response.body.id;
				var updateJSON = {
					"first_name": "hello",
					"last_name": "hello",
					"username": "hello",
					"email": "hello@example.com",
					"bio": "A boy raised on a farm.",
					"id": userID
				}

				request.put({
					uri: base_url + "people/my_profile/" + userID,
					method: "PUT",
					headers: {Cookie: signupCookie},
					json: updateJSON
				},
				function(error, response, body) {
					assert.equal(200, response.statusCode);
					assert.equal("hello", response.body.first_name);
					assert.equal("hello", response.body.last_name);
					assert.equal("hello", response.body.username);
					assert.equal("hello@example.com", response.body.email);
					assert.equal("A boy raised on a farm.", response.body.bio);
					request.post({
						uri: base_url + "signout",
						method: "POST",
						headers: {Cookie: signupCookie},
						json: {}
					},
					function(error, response, body) {
						assert.equal(200, response.statusCode);
						assert.equal(base_url, response.body.redirect);
						done();
					});
				});
			});
		});

	});
});

describe("GET /people/profiles", function() {
	it("query user profiles", function(done) {
		var signupJSON = {
			"first_name": "test",
    		"last_name": "test",
    		"email": "test@example.com",
    		"username": "test",
    		"password": "password"
		};
		request.post({
			uri: base_url + "signup",
			method: "POST",
			json: signupJSON
		},
		function(error, response, body) {
			assert.equal(200, response.statusCode);
			assert.equal(base_url, response.body.redirect);
			var signupCookie = response.headers['set-cookie'].pop().split(';')[0];
			request.get({
				uri: base_url + "people/profiles?queryString=Contreras",
				method: "GET",
				headers: {Cookie: signupCookie},
				json: {}
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);

				request.post({
					uri: base_url + "signout",
					method: "POST",
					headers: {Cookie: signupCookie},
					json: {}
				},
				function(error, response, body) {
					assert.equal(200, response.statusCode);
					assert.equal(base_url, response.body.redirect);
					done();
				});
			});
		});
	});
});

describe("POST /favorites/add_user", function() {
	it("going to add user to a favorites list dependent on category", function(done) {
		var signupJSON1 = {
			"first_name": "test1",
			"last_name": "test1",
			"email": "test1@example.com",
			"username": "test1",
			"password": "password"
		};
		request.post({
			uri: base_url + "signup",
			method: "POST",
			json: signupJSON1
		}, 
		function(error, response, body) {
			assert.equal(200, response.statusCode);
			var signupCookie1 = response.headers['set-cookie'].pop().split(';')[0];
			var signupJSON2 = {
				"first_name": "test2",
				"last_name": "test2",
				"email": "test2@example.com",
				"username": "test2",
				"password": "password"
			};
			request.post({
				uri: base_url + "signup",
				method: "POST",
				json: signupJSON2
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				var signupCookie2 = response.headers['set-cookie'].pop().split(';')[0];
				var addUserJSON = {
					"other_username": "test2",
					"category": "generic"
				};
				request.post({
					uri: base_url + "favorites/add_user",
					headers: {Cookie: signupCookie1},
					method: "POST",
					json: addUserJSON
				}, function(error, response, body) {
					assert.equal(200, response.statusCode);
					request.post({
						uri: base_url + "signout",
						headers: {Cookie: signupCookie1},
						method: "POST",
						json: {}
					}, function(error, response, body) {
						assert.equal(200, response.statusCode);
						request.post({
							uri: base_url + "signout",
							headers: {Cookie: signupCookie2},
							method: "POST",
							json: {}
						}, function(error, response, body) {
							assert.equal(200, response.statusCode);
							done();
						});
					});
				});
			});
		});
	});
});

describe("POST /favorites/add_category", function() {
	it("going to add category to users favorites by category list", function(done) {
		var singupJSON1 = {
			"first_name": "test1",
			"last_name": "test1",
			"email": "test1@example.com",
			"username": "test1",
			"password": "password"
		};
		request.post({
			uri: base_url + "signup",
			method: "POST",
			json: singupJSON1
		},
		function(error, response, body) {
			assert.equal(200, response.statusCode);
			var signupCookie1 = response.headers['set-cookie'].pop().split(';')[0];
			var signupJSON2 = {
				"first_name": "test2",
				"last_name": "test2",
				"email": "test2@example.com",
				"username": "test2",
				"password": "password"
			}
			request.post({
				uri: base_url + "signup",
				method: "POST",
				json: signupJSON2
			},
			function(error, response, body) {
				assert.equal(200, response.statusCode);
				var signupCookie2 = response.headers['set-cookie'].pop().split(';')[0];
				var addCategoryJSON = {
					"category": "IT"
				};
				request.post({
					uri: base_url + "favorites/add_category",
					method: "POST",
					headers: {Cookie: signupCookie1},
					json: addCategoryJSON
				}, function(error, response, body) {
					assert.equal(200, response.statusCode);
					var addUserJSON = {
						"other_username": "test2",
						"category": "IT"
					};
					request.post({
						uri: base_url + "favorites/add_user",
						headers: {Cookie: signupCookie1},
						method: "POST",
						json: addUserJSON
					}, function(error, response, body) {
						assert.equal(200, response.statusCode);
						request.post({
							uri: base_url + "signout",
							method: "POST",
							headers: {Cookie: signupCookie1},
							json: {}
						},
						function(error, response, body) {
							assert.equal(200, response.statusCode);
							request.post({
								uri: base_url + "signout",
								method: "POST",
								headers: {Cookie: signupCookie2},
								json: {}
							},
							function(error, response, body) {
								assert.equal(200, response.statusCode);
								done();
							});
						});
					});
				});
			});

		});
	});
});
