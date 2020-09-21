const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  name: String,
  imgUrl: String,
});

// throws possible error
module.exports = mongoose.model("cards", cardSchema);
