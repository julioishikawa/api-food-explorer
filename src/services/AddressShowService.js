const AppError = require("../utils/AppError");

class AddressShowService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({ id }) {
    const address = await this.addressRepository.getAddressById(id);

    if (!address) {
      throw new AppError("Endereço não encontrado.", 404);
    }

    return address;
  }
}

module.exports = AddressShowService;
