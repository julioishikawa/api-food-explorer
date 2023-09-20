const FavoritesRepository = require("../repositories/FavoritesRepository");
const FavoritesCreateService = require("../services/FavoritesCreateService");
const FavoritesDeleteService = require("../services/FavoritesDeleteService");
const FavoritesIndexService = require("../services/FavoritesIndexService");

class FavoritesController {
  async create(req, res) {
    const { id: user_id } = req.user;
    const { dish_id } = req.params;

    const favoritesRepository = new FavoritesRepository();
    const favoritesCreateService = new FavoritesCreateService(
      favoritesRepository
    );

    await favoritesCreateService.execute({ user_id, dish_id });

    return res.status(201).json();
  }

  async delete(req, res) {
    const { id: user_id } = req.user;
    const { dish_id } = req.params;

    const favoritesRepository = new FavoritesRepository();
    const favoritesDeleteService = new FavoritesDeleteService(
      favoritesRepository
    );

    await favoritesDeleteService.execute({ user_id, dish_id });

    return res.json();
  }

  async index(req, res) {
    const { id: user_id } = req.user;

    const favoritesRepository = new FavoritesRepository();
    const favoritesIndexService = new FavoritesIndexService(
      favoritesRepository
    );

    const favorites = await favoritesIndexService.execute({ user_id });

    return res.json(favorites);
  }
}

module.exports = FavoritesController;
