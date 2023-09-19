const knex = require("knex");

class UsersRepository {
  async getUserByEmail(email) {
    const [user] = await knex("users").where({ email });

    return user;
  }

  async create({ name, email, password }) {
    const user = await knex("users").where({ name, email, password });

    return user;
  }
}

module.exports = UsersRepository;
