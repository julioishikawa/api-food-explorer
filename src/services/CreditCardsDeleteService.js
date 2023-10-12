const AppError = require("../utils/AppError");

class CreditCardsDeleteService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({ id }) {
    const creditCard = await this.creditCardsRepository.getCreditCardById(id);

    if (!creditCard) {
      throw new AppError("Cartão de crédito não encontrado.", 404);
    }

    await this.creditCardsRepository.deleteCreditCard(id);
  }
}

module.exports = CreditCardsDeleteService;
