const { hash, compare } = require("bcryptjs");

const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userWithEmail = await knex("users").whereLike("email", `%${email}%`);

    const findByEmail = userWithEmail.find((user) => user.email === email);

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os dados");
    }

    if (findByEmail) {
      throw new AppError("O e-mail já está em uso!");
    }

    const hashedPassword = await hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ name, email, password });
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const userWithEmail = await knex
      .select("*")
      .from("users")
      .whereLike("email", `%${email}%`);

    const isEmailFromDiferentUser = userWithEmail.find(
      (userEmail) => userEmail.email !== user.email
    );

    if (isEmailFromDiferentUser) {
      throw new AppError("O e-mail já existe.");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa digitar a senha antiga para definir uma nova senha."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga está errada.");
      }

      user.password = await hash(password, 10);
    }

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return res.status(201).json();
  }
}

module.exports = UsersController;
