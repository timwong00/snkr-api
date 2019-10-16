const mongoose = require("mongoose");
const Collection = require("../models/collection");
const Sneaker = require("../models/sneaker");

exports.collection_get_all = (req, res, next) => {
  Collection.find()
    .select("sneaker quantity _id")
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
              url: "http:localhost:3000/collection/" + doc._id
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
          message: "Sneaker not found"
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
          sneaker: result.sneaker,
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

exports.collection_get_sneaker = (req, res, next) => {};

exports.collection_delete_sneaker = (req, res, next) => {};
