const SessionsRepository = require("../repositories/SessionsRepository");
const SessionsCreateService = require("../services/SessionsCreateService");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsCreateService = new SessionsCreateService(sessionsRepository);

    const { user, token } = await sessionsCreateService.execute({
      email: email.toLowerCase(),
      password,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsController;
