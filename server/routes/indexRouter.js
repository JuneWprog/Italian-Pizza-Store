const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const dishController = require("../controller/dishController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/profile", userController.updateProfile);
router.post("/checkout", orderController.createOrder);
router.get("/search/:criteria", dishController.search);

module.exports = router;
