import booksModel from "../models/book.model.js";

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
            googleId,
            rate,
            page = 1,
            limit = 10
        } = filters;
        const query = {};

        if (rate !== undefined) {
            query.rate = rate;
        }


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
            query.available = available;
        }

        if (genre) {
            query.genre = genre;
        }

        if (readStatus) {
            query.readStatus = readStatus;
        }

        if (googleId) {
            query.googleId = googleId;
        }

        if (readingDateFrom) {
            query.readingDate = { $gte: new Date(readingDateFrom) };
        }

        if (year !== undefined) {
            query.year = Number(year);
        }

        const skip = (Number(page) - 1) * Number(limit);

        const books = await booksModel.find(query).skip(skip).limit(Number(limit)).lean();

        return books;
    };

    getBookById = async (bookId) => {
        const bookById = await booksModel.findById(bookId);
        return bookById;
    };

    getBookByGoogleId = async (googleId) => {
        const book = await booksModel.findOne({ googleId });
        return book;
    };

    saveBook = async (book) => {
        const newBook = await booksModel.create(book);
        return newBook;
    };

    updateById = async (bookId, updateData) => {
        const bookToUpdate = await booksModel.findByIdAndUpdate(
            bookId,
            updateData,
            { new: true, runValidators: true }
        );
        return bookToUpdate;
    };

    deleteById = async (bookId) => {
        const bookToDelete = await booksModel.findByIdAndDelete(bookId);
        return bookToDelete;
    }
};
