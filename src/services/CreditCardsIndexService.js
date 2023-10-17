class CreditCardsIndexService {
  constructor(creditCardsRepository) {
    this.creditCardsRepository = creditCardsRepository;
  }

  async execute({ user_id }) {
    const creditCards =
      await this.creditCardsRepository.getAllCreditCardsFromUser(user_id);

    return creditCards;
  }
}

module.exports = CreditCardsIndexService;
