import booksService from "../services/books.service.js";

const getAllBooks = async (req, res) => {
    try {
        const filters = req.query; // Obtener query parameters
        const books = await booksService.getAllBooksService(filters);
        res.status(200).send(books)
    } catch (error) {
        let status = 500;
        const message = String(error?.message || '').toLowerCase();
        if (message.includes('invalid')) {
            status = 400;
        }
        res.status(status).send({ error: error.message })
    }
};

const getBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const bookById = await booksService.getBookByIdService(bookId);
        res.status(200).send(bookById)
    } catch (error) {
        let status = 500;
        if (error?.message === 'Invalid book ID format') {
            status = 400;
        } else if (error?.message === 'Book not found') {
            status = 404;
        }
        res.status(status).send({ error: error.message })
    }
};

const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = await booksService.saveBookService(bookData);
        res.status(201).send(newBook)
    } catch (error) {
        let status = 500;
        const msg = String(error?.message || '').toLowerCase();
        if (msg.includes('required') || msg.includes('invalid') || msg.includes('cannot')) {
            status = 400;
        }
        res.status(status).send({ error: error.message })
    }
};

const updateBookById = async (req, res) => {
    const { bookId } = req.params;
    const updateData = req.body;
    try {
        const updatedBook = await booksService.updateByIdService(bookId, updateData);
        res.status(200).send(updatedBook)
    } catch (error) {
        let status = 500;
        if (error?.message === 'Invalid book ID format') {
            status = 400;
        } else if (error?.message === 'Book not found') {
            status = 404;
        }
        res.status(status).send({ error: error.message })
    }
};

const deleteBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const deletedBook = await booksService.deleteByIdService(bookId);
        res.status(200).send(deletedBook)
    } catch (error) {
        let status = 500;
        if (error?.message === 'Invalid book ID format') {
            status = 400;
        } else if (error?.message === 'Book not found') {
            status = 404;
        }
        res.status(status).send({ error: error.message })
    }
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById
};


