const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesImageController {
  async create(req, res) {
    const dish_id = req.params.id;

    const imageFile = req.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id: dish_id }).first();

    if (!dish) {
      await diskStorage.verifyFile(imageFile);
      throw new AppError("Insira um prato existente para inserir uma foto.");
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(imageFile);

    dish.image = filename;

    await knex("dishes").update(dish).where({ id: dish_id });

    return res.status(201).json(dish);
  }
}

module.exports = DishesImageController;
