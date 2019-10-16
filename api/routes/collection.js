const express = require("express");
const router = express.Router();

const CollectionController = require("../controllers/collection");

router.get("/", CollectionController.collection_get_all);

router.post("/", CollectionController.collection_add_sneaker);

module.exports = router;
