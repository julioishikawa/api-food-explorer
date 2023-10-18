const { Router } = require("express");

const AddressController = require("../controllers/AddressController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const addressRoutes = Router();
const addressController = new AddressController();

addressRoutes.use(ensureAuthenticated);

addressRoutes.post("/", addressController.create);
addressRoutes.put("/:id", addressController.update);
addressRoutes.get("/", addressController.index);
addressRoutes.get("/:id", addressController.show);
addressRoutes.delete("/:id", addressController.delete);

module.exports = addressRoutes;
