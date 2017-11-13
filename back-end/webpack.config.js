const path = require('path');

module.exports = {
	entry: "../front-end/main/app.js",
	output: {
		path: __dirname,
		filename: "bundle.js",
		sourceMapFilename: "bundle.map"
	},
	devtool: '#source-map',
	module: {
	    rules: [
	      {
	        test: /\.htm$/,
	        use: 'raw-loader'
	      }
	    ]
	  },
	resolve: {
		extensions: [".js", ".json"],
		modules: [path.resolve(__dirname, "src/modules"),'node_modules', 'bower_components']
	}
};





// var path = require("path");

// module.exports = {
// 	entry: "../front-end/main/app.js",
// 	output: {
// 		path: path.join(__dirname, "../front-end"),
// 		filename: "bundle.js"
// 	},
// 	resolve: {
// 		modules: ["bower_components", "node_modules"]
// 	}

// };