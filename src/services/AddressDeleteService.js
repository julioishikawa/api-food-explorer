const AppError = require("../utils/AppError");

class AddressDeleteService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({ id }) {
    const address = await this.addressRepository.getAddressById(id);

    if (!address) {
      throw new AppError("Endereço não encontrado.", 404);
    }

    await this.addressRepository.deleteAddress(id);
  }
}

module.exports = AddressDeleteService;
