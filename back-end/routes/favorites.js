var _favoritesRouter = require("express").Router();
var favoritesController = require("../controllers/favorites").controller;

_favoritesRouter.post("/favorites/add_user", favoritesController.post_favorites_add_user);
_favoritesRouter.post("/favorites/add_category", favoritesController.post_favorites_add_category);
_favoritesRouter.delete("/favorites/remove_user", favoritesController.delete_favorites_remove_user);

module.exports = {favoritesRouter: _favoritesRouter};