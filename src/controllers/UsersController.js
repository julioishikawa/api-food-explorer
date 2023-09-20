const UsersRepository = require("../repositories/UsersRepository");
const UsersCreateService = require("../services/UsersCreateService");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();
    const usersCreateService = new UsersCreateService(usersRepository);

    await usersCreateService.execute({
      name,
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json();
  }
}

module.exports = UsersController;
