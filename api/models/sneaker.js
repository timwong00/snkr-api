const mongoose = require("mongoose");

const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, required: true },
  name: { type: String, required: true },
  retailPrice: { type: Number, required: true },
  size: { type: String, required: true },
  colorway: { type: String, required: true },
  sneakerImage: { type: String, required: true }
});

module.exports = mongoose.model("Sneaker", sneakerSchema);
