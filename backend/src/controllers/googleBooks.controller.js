import axios from 'axios';
import configs from '../configs/configs.js';

const { googleBooksApiKey } = configs;

const searchGoogleBooks = async (req, res) => {
    try {
        if (!googleBooksApiKey) {
            return res.status(500).json({ error: 'La clave de Google Books no está configurada.' });
        }

        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Debes enviar el parámetro de búsqueda "q".' });
        }

        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${googleBooksApiKey}`;

        const response = await axios.get(url);

        if (!Array.isArray(response.data.items) || response.data.items.length === 0) {
            return res.status(404).json({ error: 'No se encontraron libros para tu búsqueda.' });
        }

        const books = response.data.items.map((item) => {
            const info = item.volumeInfo || {};
            return {
                googleId: item.id,
                title: info.title || 'Título desconocido',
                author: info.authors?.join(', ') || 'Autor desconocido',
                description: info.description || 'Sin descripción disponible',
                publishedDate: info.publishedDate || 'Fecha desconocida',
                thumbnail: info.imageLinks?.thumbnail || null
            };
        });

        return res.status(200).json(books);
    } catch (error) {
        console.error('Error al consultar Google Books:', error.message);
        return res.status(500).json({ error: 'Ocurrió un error al obtener los libros de Google Books.' });
    }
};

export default searchGoogleBooks;