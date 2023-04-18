const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
