import BooksRepository from "../repositories/books.repository.js";
import mongoose from "mongoose";

const booksRepository = new BooksRepository();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllBooksService = async (filters) => {
    const books = await booksRepository.getAllBooks(filters);
    return books;
};

const getBookByIdService = async (bookId) => {
    if (!isValidObjectId(bookId)) {
      throw new Error('Invalid book ID format');
    }
    const bookById = await booksRepository.getBookById(bookId);
    if (!bookById) {
      throw new Error('Book not found');
    }
    return bookById;
  };

const saveBookService = async (bookData) => {
    if (!bookData.title || !bookData.author) {
        throw new Error('Title and author are required');
    }

    if (bookData.year && bookData.year > new Date().getFullYear()) {
        throw new Error('Year cannot be in the future');
    }

    const validReadStatus = ['read', 'unread'];
    if (bookData.readStatus && !validReadStatus.includes(bookData.readStatus)) {
        throw new Error(`Invalid readStatus value. Allowed values: ${validReadStatus.join(', ')}`);
    }

    const validGenres = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'unknown'];
    if (bookData.genre && !validGenres.includes(bookData.genre)) {
        throw new Error(`Invalid genre value. Allowed values: ${validGenres.join(', ')}`);
    }

    const newBook = await booksRepository.saveBook(bookData);
    return newBook;
};

const updateByIdService = async (bookId, updateData) => {
    if (!isValidObjectId(bookId)) {
      throw new Error('Invalid book ID format');
    }
  
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('Please add valid data to update');
    }
  
    // Validar enums si vienen en updateData
    const validReadStatus = ['read', 'unread'];
    if (updateData.readStatus && !validReadStatus.includes(updateData.readStatus)) {
      throw new Error(`Invalid readStatus value. Allowed values: ${validReadStatus.join(', ')}`);
    }
  
    const validGenres = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'unknown'];
    if (updateData.genre && !validGenres.includes(updateData.genre)) {
      throw new Error(`Invalid genre value. Allowed values: ${validGenres.join(', ')}`);
    }
  
    // Validar que 'year' no sea futura, si viene
    if (updateData.year && updateData.year > new Date().getFullYear()) {
      throw new Error('Year cannot be in the future');
    }
  
    const bookToUpdate = await booksRepository.updateById(bookId, updateData);
    if (!bookToUpdate) {
      throw new Error('Book not found');
    }
  
    return bookToUpdate;
  };

const deleteByIdService = async (bookId) => {
    if (!isValidObjectId(bookId)) {
      throw new Error('Invalid book ID format');
    }
    const bookToDelete = await booksRepository.deleteById(bookId);
    if (!bookToDelete) {
      throw new Error('Book not found');
    }
    return bookToDelete;
  };

export default {
    getAllBooksService,
    getBookByIdService,
    saveBookService,
    updateByIdService,
    deleteByIdService,
};