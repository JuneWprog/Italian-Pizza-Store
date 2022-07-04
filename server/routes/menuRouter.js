const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");

router.get("/", menuController.showMenu);
router.get("/:category", menuController.showMenuForCategory);

module.exports = router;
