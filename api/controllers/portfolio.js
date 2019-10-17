const mongoose = require("mongoose");
const Portfolio = require("../models/portfolio");
const Sneaker = require("../models/sneaker");

exports.portfolio_get_all = (req, res, next) => {
  Portfolio.find()
    .select("-__v")
    .populate("sneaker", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        portfolio: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            sneaker: doc.sneaker,
            streetwear: doc.streetwear,
            request: {
              type: "GET",
              url: "http://localhost:3000/portfolio/" + doc._id
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

exports.portfolio_get_portfolio = (req, res, next) => {
  Portfolio.findById(req.params.portfolioId)
    .select("-__v")
    .populate("sneaker", "-__v")
    .exec()
    .then(portfolio => {
      if (!portfolio) {
        return res.status(404).json({
          message: "portfolio not found"
        });
      }
      res.status(200).json({
        portfolio: portfolio,
        request: {
          type: "GET",
          url: "http://localhost:3000/portfolio"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// fix?
exports.portfolio_create_portfolio = (req, res, next) => {
  Sneaker.findById(req.body.sneakerId)
    .then(sneaker => {
      if (!sneaker) {
        return res.status(404).json({
          message: "Sneaker not found in the catalogue"
        });
      }
      const portfolio = new Portfolio({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        sneaker: req.body.sneakerId
      });
      return portfolio.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Portfolio saved.",
        savedPortfolio: {
          _id: result._id,
          name: result.name,
          sneaker: result.sneaker
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/portfolio/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.portfolio_delete_portfolio = (req, res, next) => {
  Portfolio.deleteOne({ _id: req.params.portfolioId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Portfolio deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/portfolio",
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
