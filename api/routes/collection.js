const express = require("express");
const router = express.Router();

const CollectionController = require("../controllers/collection");

router.get("/", CollectionController.collection_get_all);

router.get("/:collectionId", CollectionController.collection_get_collection);

router.post("/", CollectionController.collection_add_sneaker);

router.delete(
  "/:collectionId",
  CollectionController.collection_delete_collection
);

module.exports = router;
