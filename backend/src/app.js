import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRouter from './routes/books.routes.js';
import googleBooksRouter from './routes/googleBooks.routes.js';
import configs from './configs/configs.js';

const app = express();
const { port, mongoUri } = configs;

if (!mongoUri) {
    console.error('La variable de entorno MONGO_URI no está configurada.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRouter);
app.use('/api/google-books', googleBooksRouter);

app.get('/', (_req, res) => {
    res.send('API Books Running');
});

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conectado a MongoDB');
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err);
        process.exit(1);
    });