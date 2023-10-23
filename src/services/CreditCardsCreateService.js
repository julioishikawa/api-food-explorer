const AppError = require("../utils/AppError");

class CreditCardsCreateService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    user_id,
  }) {
    if (!card_number || !cardholder_name || !expiration_date || !cvc) {
      throw new AppError("Você precisa preencher todos os campos.", 400);
    }

    const creditCardAlreadyExists =
      await this.creditCardsRepository.getCreditCardByNumber(
        card_number,
        user_id
      );

    if (creditCardAlreadyExists) {
      throw new AppError(
        "Esse número de cartão de crédito já existe na sua conta.",
        401
      );
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
