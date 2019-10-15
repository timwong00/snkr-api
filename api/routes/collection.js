const express = require("express");
const router = express.Router();

const CollectionController = require("../controllers/collection");

router.get("/", CollectionController.collection_get_all);

module.exports = router;
