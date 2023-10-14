const CreditCardsRepository = require("../repositories/CreditCardsRepository");
const CreditCardsCreateService = require("../services/CreditCardsCreateService");
const CreditCardsUpdateService = require("../services/CreditCardsUpdateService");
const CreditCardsIndexService = require("../services/CreditCardsIndexService");
const CreditCardsDeleteService = require("../services/CreditCardsDeleteService");

class CreditCardsController {
  async create(req, res) {
    const { card_number, cardholder_name, expiration_date, cvc } = req.body;

    const { id: user_id } = req.user;

    const creditCardsRepository = new CreditCardsRepository();
    const creditCardsCreateService = new CreditCardsCreateService(
      creditCardsRepository
    );

    const creditCards_id = await creditCardsCreateService.execute({
      card_number,
      cardholder_name,
      expiration_date,
      cvc,
      user_id,
    });

    return res.status(201).json({
      message: "Cartão de crédito criado com sucesso.",
      creditCards_id,
    });
  }

  async update({ req, res }) {
    const { card_number, cardholder_name, expiration_date, cvc } = req.body;

    const { id } = req.params;

    const creditCardsRepository = new CreditCardsRepository();
    const creditCardsUpdateService = new CreditCardsUpdateService(
      creditCardsRepository
    );

    await creditCardsUpdateService.execute({
      id,
      card_number,
      cardholder_name,
      expiration_date,
      cvc,
    });

    return res.status(201).json({
      message: "Cartão de crédito atualizado com sucesso.",
      id: +id,
    });
  }

  async index(req, res) {
    const { id: user_id } = req.user;

    const creditCardsRepository = new CreditCardsRepository();
    const creditCardsIndexService = new CreditCardsIndexService(
      creditCardsRepository
    );

    const creditCards = await creditCardsIndexService.execute({ user_id });

    return res.json(creditCards);
  }

  async delete(req, res) {
    const { id } = req.params;

    const creditCardsRepository = new CreditCardsRepository();
    const creditCardsDeleteService = new CreditCardsDeleteService(
      creditCardsRepository
    );

    creditCardsDeleteService.execute({ id });

    return res.json();
  }
}

module.exports = CreditCardsController;
