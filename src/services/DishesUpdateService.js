class DishesUpdateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ id, name, category, ingredients, price, description }) {
    if (!name || !category || !ingredients || !price || !description) {
      throw new AppError("Você precisa preencher todos os campos.", 400);
    }

    const dishToUpdate = await this.dishesRepository.getDishById(id);

    if (!dishToUpdate) {
      throw new AppError("Prato não encontrado.", 404);
    }

    const updatedDish = Object.assign(dishToUpdate, {
      name,
      category,
      price,
      description,
    });

    await this.dishesRepository.updateDish(updatedDish);

    const ingredientsWithDishId = ingredients.map((ingredient) => ({
      name: ingredient,
      dish_id: id,
    }));

    await this.dishesRepository.updateIngredients(id, ingredientsWithDishId);
  }
}

module.exports = DishesUpdateService;
