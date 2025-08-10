import booksModel from "../models/book.model.js";

const validReadStatus = ['read', 'unread'];
const validGenres = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'unknown'];

// Escape user input for use in RegExp
const escapeRegex = (input) => String(input).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default class BooksRepository {
    
    getAllBooks = async (filters = {}) => {
        const {
            author,
            available,
            genre,
            readStatus,
            readingDateFrom,
            year,
            search,
            titleLike,
            authorLike,
            page = 1,
            limit = 10
        } = filters;
        const query = {};

        if (author) query.author = author;

        // Text search by regex: search in title or author, or individual fields
        const orConditions = [];
        if (search) {
            const pattern = escapeRegex(search);
            orConditions.push(
                { title: { $regex: pattern, $options: 'i' } },
                { author: { $regex: pattern, $options: 'i' } }
            );
        }
        if (titleLike) {
            const pattern = escapeRegex(titleLike);
            orConditions.push({ title: { $regex: pattern, $options: 'i' } });
        }
        if (authorLike) {
            const pattern = escapeRegex(authorLike);
            orConditions.push({ author: { $regex: pattern, $options: 'i' } });
        }
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }

        if (available !== undefined) {
            // Validar que available sea booleano o cadena 'true'/'false'
            if (available === true || available === 'true') query.available = true;
            else if (available === false || available === 'false') query.available = false;
            else throw new Error('Invalid available filter value');
        }

        if (genre) {
            if (!validGenres.includes(genre)) {
                throw new Error(`Invalid genre filter value, allowed: ${validGenres.join(', ')}`);
            }
            query.genre = genre;
        }

        if (readStatus) {
            if (!validReadStatus.includes(readStatus)) {
                throw new Error(`Invalid readStatus filter value, allowed: ${validReadStatus.join(', ')}`);
            }
            query.readStatus = readStatus;
        }

        if (readingDateFrom) {
            const date = new Date(readingDateFrom);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid readingDateFrom filter value');
            }
            query.readingDate = { $gte: date };
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
            query.year = parsedYear;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const books = await booksModel.find(query).skip(skip).limit(Number(limit)).lean();

        return books;
    };

    getBookById = async (bookId) => {
        const bookById = await booksModel.findById(bookId);
        return bookById;
    };

    saveBook = async (book) => {
        const newBook = await booksModel.create(book);
        return newBook;
    };

    updateById = async (bookId, updateData) => {
        const bookToUpdate = await booksModel.findByIdAndUpdate(bookId, updateData, { new: true });
        return bookToUpdate;
    };

    deleteById = async (bookId) => {
        const bookToDelete = await booksModel.findByIdAndDelete(bookId);
        return bookToDelete;
    }
};
