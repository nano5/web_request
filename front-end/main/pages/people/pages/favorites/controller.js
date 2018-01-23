var model = require("main/pages/people/pages/favorites/model");
var view = require("main/pages/people/pages/favorites/view");

function Controller(){};

Controller.prototype.favorites = function() {
	var favorites = new view.default.Favorites();
	favorites.render({
						FavoritesByCategory: model.default.FavoritesByCategory,
						Profiles: model.default.Profiles,
						AddCategory: model.default.AddCategory
					});
}

var _controller = new Controller();

export default {
	controller: _controller
}