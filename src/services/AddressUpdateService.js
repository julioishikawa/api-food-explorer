const AppError = require("../utils/AppError");

class AddressUpdateService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({ id, name, neighborhood, street, number, complement }) {
    if (!name || !neighborhood || !street || !number || !complement) {
      throw new AppError("Preencha todos os campos.", 400);
    }

    const addressToUpdate = await this.addressRepository.getAddressById(id);

    if (!addressToUpdate) {
      throw new AppError("Endereço não encontrado.", 404);
    }

    const addressAlreadyExists =
      await this.addressRepository.getAddressByStreetName(street);

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
