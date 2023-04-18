const express = require('express');
const Book = require('../models/book.js');
const router = express.Router();

// GET /books
router.get('/', async (req, res) => {
  const {title,author} = req.query;       //Filteration

 const query ={}

 if (title){
  query.title = title;
 }

 if (author){
  query.author = author;
 }
 const {page}=req.query;         //Pagination
 
 const limit=2;
 const skip= (page- 1)*limit;

  const books = await Book.find(query).sort({author:1}).skip(skip).limit(limit);
  res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST /books
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  try {
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  await book.remove();
  res.json({ message: 'Book deleted' });
});


module.exports = router;
