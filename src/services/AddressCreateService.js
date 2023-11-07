const AppError = require("../utils/AppError");

class AddressCreateService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({ name, neighborhood, street, number, complement, user_id }) {
    if (!name || !neighborhood || !street || !number) {
      throw new AppError("Preencha todos os campos.", 400);
    }

    const addressAlreadyExists =
      await this.addressRepository.getAddressByHouseNumber(
        neighborhood,
        street,
        number,
        user_id
      );

    if (addressAlreadyExists) {
      throw new AppError("Esse endereço já está cadastrado na sua conta.", 401);
    }

    const addressCreated = await this.addressRepository.createAddress({
      name,
      neighborhood,
      street,
      number,
      complement,
      user_id,
    });

    return addressCreated;
  }
}

module.exports = AddressCreateService;
