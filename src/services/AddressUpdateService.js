const AppError = require("../utils/AppError");

class AddressUpdateService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({
    id,
    name,
    neighborhood,
    street,
    number,
    complement,
    user_id,
  }) {
    if (!name || !neighborhood || !street || !number) {
      throw new AppError("Preencha todos os campos.", 400);
    }

    const addressToUpdate = await this.addressRepository.getAddressById(id);

    if (!addressToUpdate) {
      throw new AppError("Endereço não encontrado.", 404);
    }

    const addressAlreadyExists =
      await this.addressRepository.getAddressByHouseNumber(number, user_id);

    if (addressAlreadyExists) {
      throw new AppError(
        "Esse endereço já está cadastrado na sua conta. Exclua ou atualize para outro endereço.",
        401
      );
    }

    const updatedAddress = Object.assign(addressToUpdate, {
      name,
      neighborhood,
      street,
      number,
      complement,
    });

    await this.addressRepository.updateAddress(updatedAddress);
  }
}

module.exports = AddressUpdateService;
