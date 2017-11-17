const path = require('path');
console.log(__dirname);
module.exports = {
	entry: { 
		main: "../front-end/main/app.js"
	},
	output: {
		path: __dirname,
		filename: "[name].bundle.js",
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
		modules: [path.resolve(__dirname, "src/modules"),
		path.resolve(__dirname, 'node_modules'), 'bower_components', path.resolve(__dirname,"../front-end")]
	}
};