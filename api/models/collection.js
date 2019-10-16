const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sneaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sneaker",
    required: true
  },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Collection", collectionSchema);
