import booksService from "../services/books.service.js";

const getAllBooks = async (req, res) => {
    try {
        const filters = req.query; // Obtener query parameters
        const books = await booksService.getAllBooksService(filters);
        res.status(200).send(books)
    } catch (error) {
        const message = String(error?.message || '').toLowerCase();
        if (message.includes('invalid')) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

const getBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const bookById = await booksService.getBookByIdService(bookId);
        res.status(200).send(bookById)
    } catch (error) {
        if (error?.message === 'Invalid book ID format') {
            res.status(400).send({ error: error.message });
        } else if (error?.message === 'Book not found') {
            res.status(404).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = await booksService.saveBookService(bookData);
        res.status(201).send(newBook)
    } catch (error) {
        const msg = String(error?.message || '').toLowerCase();
        if (msg.includes('required') || msg.includes('invalid') || msg.includes('cannot')) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

const updateBookById = async (req, res) => {
    const { bookId } = req.params;
    const updateData = req.body;
    try {
        const updatedBook = await booksService.updateByIdService(bookId, updateData);
        res.status(200).send(updatedBook)
    } catch (error) {
        if (error?.message === 'Invalid book ID format') {
            res.status(400).send({ error: error.message });
        } else if (error?.message === 'Book not found') {
            res.status(404).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

const deleteBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const deletedBook = await booksService.deleteByIdService(bookId);
        res.status(200).send(deletedBook)
    } catch (error) {
        if (error?.message === 'Invalid book ID format') {
            res.status(400).send({ error: error.message });
        } else if (error?.message === 'Book not found') {
            res.status(404).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById
};


