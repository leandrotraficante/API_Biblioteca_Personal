import booksService from "../services/books.service.js";

const getAllBooks = async (req, res) => {
    try {
        const filters = req.query; // Obtener query parameters
        const books = await booksService.getAllBooksService(filters);
        res.status(200).send(books)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const getBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const bookById = await booksService.getBookByIdService(bookId);
        res.status(200).send(bookById)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = await booksService.saveBookService(bookData);
        res.status(201).send(newBook)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const updateBookById = async (req, res) => {
    const { bookId } = req.params;
    const updateData = req.body;
    try {
        const updatedBook = await booksService.updateByIdService(bookId, updateData);
        res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const deleteBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const deletedBook = await booksService.deleteByIdService(bookId);
        res.status(200).send(deletedBook)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById
};


