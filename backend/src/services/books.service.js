import BooksRepository from "../repositories/books.repository.js";
import { 
    VALID_GENRES, 
    VALID_READ_STATUS, 
    isValidObjectId 
} from "../constants/validation.js";

const booksRepository = new BooksRepository();

const validateFilters = (filters) => {
    const { available, genre, readStatus, readingDateFrom, year } = filters;
    
    if (available !== undefined) {
        if (available !== true && available !== false && available !== 'true' && available !== 'false') {
            throw new Error('Invalid available filter value');
        }
        // Convertir string a boolean para el repository
        if (available === 'true') filters.available = true;
        if (available === 'false') filters.available = false;
    }

    if (genre && !VALID_GENRES.includes(genre)) {
        throw new Error(`Invalid genre filter value, allowed: ${VALID_GENRES.join(', ')}`);
    }

    if (readStatus && !VALID_READ_STATUS.includes(readStatus)) {
        throw new Error(`Invalid readStatus filter value, allowed: ${VALID_READ_STATUS.join(', ')}`);
    }

    if (readingDateFrom) {
        const date = new Date(readingDateFrom);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid readingDateFrom filter value');
        }
    }

    if (year !== undefined) {
        const parsedYear = Number(year);
        const currentYear = new Date().getFullYear();
        if (!Number.isInteger(parsedYear)) {
            throw new Error('Invalid year filter value, must be an integer');
        }
        if (parsedYear < 0 || parsedYear > currentYear) {
            throw new Error(`Invalid year filter value, must be between 0 and ${currentYear}`);
        }
    }
};

const getAllBooksService = async (filters) => {
    // Validar filtros antes de pasarlos al repository
    validateFilters(filters);
    
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

    if (bookData.readStatus && !VALID_READ_STATUS.includes(bookData.readStatus)) {
        throw new Error(`Invalid readStatus value. Allowed values: ${VALID_READ_STATUS.join(', ')}`);
    }

    if (bookData.genre && !VALID_GENRES.includes(bookData.genre)) {
        throw new Error(`Invalid genre value. Allowed values: ${VALID_GENRES.join(', ')}`);
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
    if (updateData.readStatus && !VALID_READ_STATUS.includes(updateData.readStatus)) {
      throw new Error(`Invalid readStatus value. Allowed values: ${VALID_READ_STATUS.join(', ')}`);
    }
  
    if (updateData.genre && !VALID_GENRES.includes(updateData.genre)) {
      throw new Error(`Invalid genre value. Allowed values: ${VALID_GENRES.join(', ')}`);
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