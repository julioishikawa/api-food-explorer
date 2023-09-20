const knex = require("../database/knex");

class DishesRepository {
  async getAllDishes(searchText) {
    const dishes = await knex("dishes as dis")
      .innerJoin("ingredients as ing", "dis.id", "ing.dish_id")
      .whereLike("dis.name", `%${searchText}%`)
      .orWhereLike("ing.name", `%${searchText}%`)
      .groupBy("dis.id")
      .select("dis.*");

    return dishes;
  }

  async getAllIngredients() {
    const ingredients = await knex("ingredients");

    return ingredients;
  }

  async getDishById(id) {
    const [dish] = await knex("dishes").where({ id });

    return dish;
  }

  async getDishIngredients(dish_id) {
    const ingredients = await knex("ingredients").where({ dish_id });

    return ingredients;
  }

  async getDishByName(name) {
    const [dish] = await knex("dishes").where({ name });

    return dish;
  }

  async createDish({ image, name, category, price, description }) {
    await knex("dishes").insert({
      image,
      name,
      category,
      price,
      description,
    });
  }

  async createIngredients(ingredients) {
    await knex("ingredients").insert(ingredients);
  }

  async updateDish({ id, image, name, category, price, description }) {
    await knex("dishes")
      .where({ id })
      .update({ image, name, category, price, description });
  }

  async updateIngredients(dish_id, ingredients) {
    await knex("ingredients").where({ dish_id }).delete();

    this.createIngredients(ingredients);
  }

  async deleteDish(id) {
    await knex("dishes").where({ id }).delete();
  }
}

module.exports = DishesRepository;
