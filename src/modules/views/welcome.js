//var Backbone = require('backbone');
//var $ = require('jquery');
//var _ = require('underscore');
//var markup = "hello: <%= name %>";


import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'
import markup from 'partials/welcome.htm'
//var markup = "hello: <%= name %>";

var IndexView = Backbone.View.extend({
	
	
	el : $('#content'),
	
	render: function(model) {
		var template = _.template(markup);
	    var out = template(model);
        this.$el.html(out);		
	}



});




export default {
	   View:IndexView
	}