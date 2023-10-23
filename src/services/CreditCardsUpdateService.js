const AppError = require("../utils/AppError");

class CreditCardsUpdateService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({
    id,
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    user_id,
  }) {
    if (!card_number || !cardholder_name || !expiration_date || !cvc) {
      throw new AppError("Você precisa preencher todos os campos.", 400);
    }

    const creditCardToUpdate =
      await this.creditCardsRepository.getCreditCardById(id);

    if (!creditCardToUpdate) {
      throw new AppError("Cartão de crédito não encontrado.", 404);
    }

    const creditCardAlreadyExists =
      await this.creditCardsRepository.getCreditCardByNumber(
        card_number,
        user_id
      );

    if (creditCardAlreadyExists) {
      throw new AppError(
        "Esse número de cartão de crédito já existe na sua conta. Exclua para adicionar novamente ou atualize para outro cartão de crédito.",
        401
      );
    }

    const updatedCreditCard = Object.assign(creditCardToUpdate, {
      card_number,
      cardholder_name,
      expiration_date,
      cvc,
    });

    await this.creditCardsRepository.updateCreditCard(updatedCreditCard);
  }
}

module.exports = CreditCardsUpdateService;
