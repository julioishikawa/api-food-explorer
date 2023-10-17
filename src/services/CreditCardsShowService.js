const AppError = require("../utils/AppError");

class CreditCardsShowService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({ id }) {
    const creditCard = await this.creditCardsRepository.getCreditCardById(id);

    if (!creditCard) {
      throw new AppError("Cartão de crédito não encontrado.", 404);
    }

    return creditCard;
  }
}

module.exports = CreditCardsShowService;
