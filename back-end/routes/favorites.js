var _favoritesRouter = require("express").Router();
var favoritesController = require("../controllers/favorites").controller;

_favoritesRouter.post("/favorites/add_user", favoritesController.post_favorites_add_user);
_favoritesRouter.delete("/favorites/remove_user", favoritesController.delete_favorites_remove_user);
_favoritesRouter.post("/favorites/add_category", favoritesController.post_favorites_add_category);
_favoritesRouter.post("/favorites/remove_category", favoritesController.post_favorites_remove_category);
_favoritesRouter.get("/favorites/my_favorites", favoritesController.get_favorites_my_favorites);
_favoritesRouter.get("/favorites/profiles", favoritesController.get_favorites_profiles);
_favoritesRouter.get("/favorites/categories", favoritesController.get_favorites_categories);

module.exports = {favoritesRouter: _favoritesRouter};