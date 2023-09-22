const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishesImageController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const adminValidation = require("../middlewares/adminValidation");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishesImageController = new DishesImageController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", adminValidation, dishesController.create);
dishesRoutes.put("/:id", adminValidation, dishesController.update);
dishesRoutes.patch(
  "/:id",
  upload.single("image"),
  adminValidation,
  dishesImageController.update
);
dishesRoutes.delete("/:id", adminValidation, dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);

module.exports = dishesRoutes;
