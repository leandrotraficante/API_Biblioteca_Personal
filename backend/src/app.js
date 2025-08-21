import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import booksRouter from './routes/books.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
    res.send('API Books Running')
});

mongoose.connect(MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });