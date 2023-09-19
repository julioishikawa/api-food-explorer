const AppError = require("../utils/AppError");

class DishesCreateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ image, name, category, ingredients, price, description }) {
    if (
      !image ||
      !name ||
      !category ||
      !ingredients ||
      !price ||
      !description
    ) {
      throw new AppError("Você precisa preencher todos os campos.", 400);
    }

    const dishAlreadyExists = await this.dishesRepository.getDishByName(name);

    if (dishAlreadyExists) {
      throw new AppError(
        `O nome do prato ${name} já existe, escolha outro nome.`,
        400
      );
    }

    const dishCreated_id = await this.dishesRepository.createDish({
      image,
      name,
      category,
      price,
      description,
    });

    const ingredientsWithDishId = ingredients.map((ingredient) => ({
      name: ingredient,
      dish_id: dishCreated_id,
    }));

    await this.dishesRepository.createIngredients(ingredientsWithDishId);

    return dishCreated_id;
  }
}

module.exports = DishesCreateService;
