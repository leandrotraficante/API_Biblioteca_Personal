import express from 'express';
import searchGoogleBooks from '../controllers/googleBooks.controller.js';

const googleBooksRouter = express.Router();
const searchRoutePath = '/search';

googleBooksRouter.get(searchRoutePath, searchGoogleBooks);

export default googleBooksRouter;

