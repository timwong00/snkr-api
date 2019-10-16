const mongoose = require("mongoose");
const Collection = require("../models/collection");
const Sneaker = require("../models/sneaker");

exports.collection_get_all = (req, res, next) => {
  Collection.find()
    .select("-__v")
    .populate("sneaker", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        collection: docs.map(doc => {
          return {
            _id: doc._id,
            sneaker: doc.sneaker,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/collection/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.collection_add_sneaker = (req, res, next) => {
  Sneaker.findById(req.body.sneakerId)
    .then(sneaker => {
      if (!sneaker) {
        return res.status(404).json({
          message: "Sneaker not found in the catalogue"
        });
      }
      const collection = new Collection({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        sneaker: req.body.sneakerId
      });
      return collection.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Collection saved.",
        savedCollection: {
          _id: result._id,
          // sneaker: result.sneaker,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/collection/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.collection_get_collection = (req, res, next) => {
  Collection.findById(req.params.collectionId)
    .select("-__v")
    .populate("sneaker", "-__v")
    .exec()
    .then(collection => {
      if (!collection) {
        return res.status(404).json({
          message: "Collection not found"
        });
      }
      res.status(200).json({
        collection: collection,
        request: {
          type: "GET",
          url: "http://localhost:3000/collection"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.collection_update_sneaker = (req, res, next) => {
  const id = req.params.collectionId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Collection.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/collection/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.collection_delete_collection = (req, res, next) => {
  Collection.deleteOne({ _id: req.params.collectionId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/collection",
          body: { userID: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
