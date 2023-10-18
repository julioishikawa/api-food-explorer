class AddressIndexService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({ user_id }) {
    const addresses = await this.addressRepository.getAllAddressesFromUser(
      user_id
    );

    return addresses;
  }
}

module.exports = AddressIndexService;
