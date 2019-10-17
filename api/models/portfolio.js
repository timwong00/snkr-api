const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  sneaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sneaker"
  }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
