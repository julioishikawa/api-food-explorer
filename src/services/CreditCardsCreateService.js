const AppError = require("../utils/AppError");

class CreditCardsCreateService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({ card_number, cardholder_name, expiration_date, cvc }) {
    if (!card_number || !cardholder_name || !expiration_date || !cvc) {
      throw new AppError("Você precisa preencher todos os campos.", 400);
    }

    const creditCardCreated = await this.creditCardsRepository.createCreditCard(
      {
        card_number,
        cardholder_name,
        expiration_date,
        cvc,
      }
    );

    return creditCardCreated;
  }
}

module.exports = CreditCardsCreateService;
