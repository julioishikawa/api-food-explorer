const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/DishesCreateService");
const DishesUpdateService = require("../services/DishesUpdateService");
const DishesShowService = require("../services/DishesShowService");
const DishesDeleteService = require("../services/DishesDeleteService");
const DishesIndexService = require("../services/DishesIndexService");

class DishesController {
  async create(req, res) {
    const { name, category, price, description, ingredients } = req.body;

    const image = "default.jpg";

    const dishesRepository = new DishesRepository();
    const dishesCreateService = new DishesCreateService(dishesRepository);

    const dish_id = await dishesCreateService.execute({
      image,
      name,
      category,
      price,
      description,
      ingredients,
    });

    return res.status(201).json({
      message: "Prato criado com sucesso",
      dish_id,
    });
  }

  async update(req, res) {
    const { name, category, price, description, ingredients } = req.body;

    const { id } = req.params;

    const dishesRepository = new DishesRepository();
    const dishesUpdateService = new DishesUpdateService(dishesRepository);

    await dishesUpdateService.execute({
      id,
      name,
      category,
      price,
      description,
      ingredients,
    });

    return res.json({
      message: "Prato atualizado com sucesso.",
      id: +id,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const dishesRepository = new DishesRepository();
    const dishesShowService = new DishesShowService(dishesRepository);

    const dish = await dishesShowService.execute({ id });

    return res.json(dish);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dishesRepository = new DishesRepository();
    const dishesDeleteService = new DishesDeleteService(dishesRepository);

    dishesDeleteService.execute({ id });

    return res.json();
  }

  async index(req, res) {
    const { searchText } = req.query;

    const dishesRepository = new DishesRepository();
    const dishesIndexService = new DishesIndexService(dishesRepository);

    const dishes = await dishesIndexService.execute(searchText);

    return res.json(dishes);
  }
}

module.exports = DishesController;
