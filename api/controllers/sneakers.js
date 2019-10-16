const mongoose = require("mongoose");
const Sneaker = require("../models/sneaker");

exports.sneakers_get_all = (req, res, next) => {
  Sneaker.find()
    // .select("brand name retailPrice size colorway sneakerImage _id")
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        sneakers: docs.map(doc => {
          return {
            brand: doc.brand,
            name: doc.name,
            retailPrice: doc.retailPrice,
            size: doc.size,
            colorway: doc.colorway,
            sneakerImage: doc.sneakerImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/sneakers/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.sneakers_add_sneaker = (req, res, next) => {
  const sneaker = new Sneaker({
    _id: new mongoose.Types.ObjectId(),
    brand: req.body.brand,
    name: req.body.name,
    retailPrice: req.body.retailPrice,
    size: req.body.size,
    colorway: req.body.colorway,
    sneakerImage: req.file.path
  });
  sneaker
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Sneaker added successfully to the catalogue.",
        addedSneaker: {
          brand: result.brand,
          name: result.name,
          retailPrice: result.retailPrice,
          size: result.size,
          colorway: result.colorway,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/sneakers/"
          }
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

exports.sneakers_get_sneaker = (req, res, next) => {
  const id = req.params.sneakerId;
  Sneaker.findById(id)
    // .select("brand name retailPrice size colorway sneakerImage _id")
    .select("-__v")
    .exec()
    .then(doc => {
      console.log("From Database: ", doc);
      if (doc) {
        res.status(200).json({
          sneaker: doc,
          request: {
            type: "GET",
            description: "GET_ALL_SNEAKERS",
            url: "http://localhost:3000/sneakers"
          }
        });
      } else {
        res.status(404).json({
          message: "No valid sneaker found in the catalogue for the provided ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sneaker_update = (req, res, next) => {
  const id = req.params.sneakerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Sneaker.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: `Sneaker ID ${id} has been updated.`,
        request: {
          type: "GET",
          url: "http://localhost:3000/sneakers/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sneaker_delete = (req, res, next) => {
  const id = req.params.sneakerId;
  Sneaker.deleteOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: `Sneaker ID ${id} has been deleted.`,
        request: {
          type: "POST",
          url: "http://localhost:3000/sneakers",
          body: {
            brand: "String",
            name: "String",
            retailPrice: "Number",
            size: "String",
            colorway: "String"
          }
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
