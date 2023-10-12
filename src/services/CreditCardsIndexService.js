class CreditCardsIndexService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({ user_id }) {
    const creditCards =
      await this.creditCardsRepository.getAllCreditCardsFromUser(user_id);

    const formattedCreditCards = creditCards.map((creditCard) => ({
      ...creditCard,
    }));

    return formattedCreditCards;
  }
}

module.exports = CreditCardsIndexService;
