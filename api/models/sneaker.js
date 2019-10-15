const mongoose = require("mongoose");

const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  colorway: { type: String, required: true },
  sneakerImage: { type: String }
});

module.exports = mongoose.model("Sneaker", sneakerSchema);
