var express = require('express');
var expressValidator = require("express-validator");
var expressSession = require("express-session");
var MongoStore = require("connect-mongo")(expressSession);
var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var comet = require("comet.io");
var path = require('path');
var http = require("http");
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var authenticationRouter = require("./routes/authentication").authenticationRouter;
var profileRouter = require("./routes/profile").profileRouter;
var app = express();
global.base_url = "http://localhost:8080/";

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(expressSession({ cookie: {maxAge: 3600000}, secret:"foobar", saveUninitialized: false, resave: false, store: new MongoStore({
        host: '127.0.0.1',
        port: '27017',
        db: 'session',
        url: 'mongodb://client:password@localhost:27017/web_requestdb'
    })}));

var config = require('./webpack.config.js');
var compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

app.use(authenticationRouter);
app.use(profileRouter);
// at this point use comet



var httpServer = http.createServer(app);
httpServer.listen(8080);
