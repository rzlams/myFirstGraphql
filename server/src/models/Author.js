const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const Author = mongoose.model("Author", Schema);

module.exports = Author;
