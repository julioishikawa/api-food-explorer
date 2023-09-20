const DishesRepository = require("../repositories/DishesRepository");
const DishesImageUpdateService = require("../services/DishesImageUpdateService");

class DishesImageController {
  async update(req, res) {
    const { id } = req.params;
    const dishImage = req.file.filename;

    const dishesRepository = new DishesRepository();
    const dishesImageUpdateService = new DishesImageUpdateService(
      dishesRepository
    );

    const dish = await dishesImageUpdateService.execute({ id, dishImage });

    return res.json(dish);
  }
}

module.exports = DishesImageController;
