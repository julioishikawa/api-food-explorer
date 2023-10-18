const AddressRepository = require("../repositories/AddressRepository");
const AddressCreateService = require("../services/AddressCreateService");
const AddressUpdateService = require("../services/AddressUpdateService");
const AddressIndexService = require("../services/AddressIndexService");
const AddressShowService = require("../services/AddressShowService");
const AddressDeleteService = require("../services/AddressDeleteService");

class AddressController {
  async create(req, res) {
    const { name, neighborhood, street, number, complement } = req.body;

    const { id: user_id } = req.user;

    const addressRepository = new AddressRepository();
    const addressCreateService = new AddressCreateService(addressRepository);

    const address_id = await addressCreateService.execute({
      name,
      neighborhood,
      street,
      number,
      complement,
      user_id,
    });

    return res.status(201).json(address_id);
  }

  async update(req, res) {
    const { name, neighborhood, street, number, complement } = req.body;

    const { id } = req.params;

    const addressRepository = new AddressRepository();
    const addressUpdateService = new AddressUpdateService(addressRepository);

    const address_id = await addressUpdateService.execute({
      id,
      name,
      neighborhood,
      street,
      number,
      complement,
    });

    return res.status(201).json(address_id);
  }

  async index(req, res) {
    const { id: user_id } = req.user;

    const addressRepository = new AddressRepository();
    const addressIndexService = new AddressIndexService(addressRepository);

    const addresses = await addressIndexService.execute({
      user_id,
    });

    return res.json(addresses);
  }

  async show(req, res) {
    const { id } = req.params;

    const addressRepository = new AddressRepository();
    const addressShowService = new AddressShowService(addressRepository);

    const address = await addressShowService.execute({
      id,
    });

    return res.json(address);
  }

  async delete(req, res) {
    const { id } = req.params;

    const addressRepository = new AddressRepository();
    const addressDeleteService = new AddressDeleteService(addressRepository);

    await addressDeleteService.execute({ id });

    return res.json();
  }
}

module.exports = AddressController;
