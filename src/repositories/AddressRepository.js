const knex = require("../database/knex");

class AddressRepository {
  async getAllAddressesFromUser(user_id) {
    const addresses = await knex("address")
      .innerJoin("users", "users.id", "address.user_id")
      .where({ user_id })
      .select("address.*");

    return addresses;
  }

  async getAddressById(id) {
    const [address] = await knex("address").where({ id });

    return address;
  }

  async getAddressByStreetName(street) {
    const [address] = await knex("address").where({ street });

    return address;
  }

  async createAddress({
    name,
    neighborhood,
    street,
    number,
    complement,
    user_id,
  }) {
    const [address] = await knex("address").insert({
      name,
      neighborhood,
      street,
      number,
      complement,
      user_id,
    });

    return address;
  }

  async updateAddress({ id, name, neighborhood, street, number, complement }) {
    await knex("address").where({ id }).update({
      name,
      neighborhood,
      street,
      number,
      complement,
    });
  }

  async deleteAddress(id) {
    await knex("address").where({ id }).delete();
  }
}

module.exports = AddressRepository;
