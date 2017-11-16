var express = require('express');
var expressValidator = require("express-validator");
var expressSession = require("express-session");
var MongoStore = require("connect-mongo")(expressSession);
var bodyParser = require("body-parser")
var path = require('path');
var http = require("http");
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

var app = express();

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(expressSession({ cookie: {maxAge: 60000}, secret:"foobar", saveUninitialized: false, resave: false, store: new MongoStore({
        host: '127.0.0.1',
        port: '27017',
        db: 'session',
        url: 'mongodb://client:password@localhost:27017/web_requestdb'
    })}));
//app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
var config = require('./webpack.config.js');
var compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

// // at this point I need to figure out if I should send the main app or the login app thing

app.get("/", function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

// // app.get("/", function(req, res) {
// // 	res.sendFile(path.join(__dirname + "/../front-end/main/view.html"));
// // });

var httpServer = http.createServer(app);
httpServer.listen(8080);
