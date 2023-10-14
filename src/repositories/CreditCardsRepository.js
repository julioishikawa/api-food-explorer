const knex = require("../database/knex");

class CreditCardsRepository {
  async getAllCreditCardsFromUser(user_id) {
    const credit_cards = await knex("credit_cards")
      .innerJoin("users", "users.id", "credit_cards.user_id")
      .where({ user_id })
      .select("credit_cards.*");

    return credit_cards;
  }

  async getCreditCardById(id) {
    const [credit_card] = await knex("credit_cards").where({ id });

    return credit_card;
  }

  async createCreditCard({
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    user_id,
  }) {
    const [credit_cards] = await knex("credit_cards").insert({
      card_number,
      cardholder_name,
      expiration_date,
      cvc,
      user_id,
    });

    return credit_cards;
  }

  async updateCreditCard({
    id,
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
  }) {
    await knex("credit_cards").where({ id }).update({
      card_number,
      cardholder_name,
      expiration_date,
      cvc,
    });
  }

  async deleteCreditCard(id) {
    await knex("credit_cards").where({ id }).delete();
  }
}

module.exports = CreditCardsRepository;
