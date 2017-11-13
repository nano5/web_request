var express = require('express');
var path = require('path');
var http = require("http");
//var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

var app = express();
app.use(express.static(path.join(__dirname, 'bower_components')));
var config = require('./webpack.config.js');
var compiler = webpack(config);

// app.use(express.static(path.join(__dirname, 'bower_components')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser());

// // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// // configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

// app.use(require('./todos.js'));

// Serve the files on port 3000.
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/../front-end/main/view.html"));
});
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!\n');
// });
var httpServer = http.createServer(app);
httpServer.listen(8080);
