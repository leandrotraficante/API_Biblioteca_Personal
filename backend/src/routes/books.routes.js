import express from 'express';
import { getAllBooks, getBookById, createBook, updateBookById, deleteBookById } from '../controllers/books.controller.js';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);

booksRouter.get('/:bookId', getBookById);

booksRouter.post('/', createBook);

booksRouter.put('/:bookId', updateBookById);

booksRouter.delete('/:bookId', deleteBookById);

export default booksRouter;