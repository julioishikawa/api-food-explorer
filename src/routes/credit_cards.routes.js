const { Router } = require("express");

const CreditCardsController = require("../controllers/CreditCardsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const creditCardsRoutes = Router();
const creditCardsController = new CreditCardsController();

creditCardsRoutes.use(ensureAuthenticated);

creditCardsRoutes.post("/", creditCardsController.create);
creditCardsRoutes.put("/:id", creditCardsController.update);
creditCardsRoutes.delete("/:id", creditCardsController.delete);
creditCardsRoutes.get("/", creditCardsController.index);

module.exports = creditCardsRoutes;
