const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  authorID: { type: String, required: true },
});

const Book = mongoose.model("Book", Schema);

module.exports = Book;
