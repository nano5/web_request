
import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'
import markup from 'partials/welcome.htm'


var IndexView = Backbone.View.extend({
	
	attributes: {id: "welcomeDiv",tagName: "div",className: "welcome"},
	
	render: function(model) {
		var template = _.template(markup);
	    var out = template(model);
        this.$el.html(out);	
        $('#root').append(this.el);
        return this;
	}



});




export default {
	   View:IndexView
	}