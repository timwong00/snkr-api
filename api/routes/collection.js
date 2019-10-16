const express = require("express");
const router = express.Router();

const CollectionController = require("../controllers/collection");

router.get("/", checkAuth, CollectionController.collection_get_all);

router.get(
  "/:collectionId",
  checkAuth,
  CollectionController.collection_get_collection
);

router.post("/", checkAuth, CollectionController.collection_add_sneaker);

router.delete(
  "/:collectionId",
  checkAuth,
  CollectionController.collection_delete_collection
);

module.exports = router;
