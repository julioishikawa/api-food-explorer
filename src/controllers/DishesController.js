const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, category, price, description, ingredients } = req.body;

    const user_id = req.user.id;

    const nameInUse = await knex("dishes").where("name", name).first();

    if (nameInUse) {
      throw new AppError("Um prato com esse nome já está cadastrado");
    }

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.status(201).json({ id: dish_id });
  }

  async update(req, res) {
    const { name, category, price, description, ingredients } = req.body;

    const { dish_id } = req.params;

    const user_id = req.user.id;

    const dish = await knex("dishes").where("id", dish_id).first();
    if (!dish) {
      throw new AppError("Prato não encontrado");
    }

    const dishWithThisName = await knex("dishes").where("name", name).first();

    if (dishWithThisName && Number(dish_id) !== dishWithThisName.id) {
      throw new AppError("Um prato com esse nome já está cadastrado");
    }

    if (!name) {
      name = dish.name;
    }

    if (!description) {
      description = dish.description;
    }

    if (!price) {
      price = dish.price;
    }

    if (!category) {
      category = dish.category;
    }

    if (ingredients) {
      await knex("ingredients").where("dish_id", dish.id).delete();
    }

    await knex("dishes").where("id", dish_id).update({
      name,
      description,
      price,
      category,
    });

    const ingredientsArray = ingredients.map((ingredient) => {
      if (ingredient.name) {
        return ingredient.name;
      } else {
        return ingredient;
      }
    });

    ingredientsArray.map(
      async (ingredient) =>
        await knex("ingredients").insert({
          name: ingredient,
          dish_id: dish.id,
          user_id,
        })
    );

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    if (!dish) {
      throw new AppError("Prato não encontrado");
    }

    return res.json({
      ...dish,
      ingredients,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("dishes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { searchText } = req.query;

    const dishes = await knex("dishes")
      .whereLike("name", `%${name}%`)
      .orderBy("name");

    const ingredients = await knex("ingredients")
      .where({ name })
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .orderBy("name");

    let updatedDishes = [...dishes];

    for (const ingredient of ingredients) {
      const newDishes = {
        image: ingredient.image,
        name: ingredient.name,
        price: ingredient.price,
        description: ingredient.description,
      };

      updatedDishes.push(newDishes);
    }

    const userIngredients = await knex("ingredients");
    const dishesWithIngredients = updatedDishes.map((dish) => {
      const dishIngredients = userIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return res.json(dishesWithIngredients);
  }
}

module.exports = DishesController;
