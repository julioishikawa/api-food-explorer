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

dishesRoutes.use(ensureAuthenticated, adminValidation);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch(
  "/image/:id",
  upload.single("image"),
  dishesImageController.update
);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;
