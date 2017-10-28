
const path = require('path');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
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