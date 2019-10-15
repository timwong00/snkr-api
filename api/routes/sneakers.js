const express = require("express");
const router = express.Router();

const SneakersController = require("../controllers/sneakers");

router.get("/", SneakersController.sneakers_get_all);

module.exports = router;
