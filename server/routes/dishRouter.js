const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishController");

router.get("/:dishId", dishController.loadDishDetails);
router.post("/addDish", dishController.addDish);
router.put("/:dishId", dishController.updateDish);
router.delete("/:dishId", dishController.deleteDish);

module.exports = router;
