var mongoose = require("mongoose");
mongoose.connect("mongodb://client:password@localhost:27017/web_requestdb",
{useMongoClient: true});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	hashedPassword: String
}, {collection: "users"});

var _User = mongoose.model("user", userSchema, "users");

module.exports = {User:_User};