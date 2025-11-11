import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

if (!process.env.MONGO_URI || !process.env.GOOGLE_BOOKS_API) {
    const projectRootEnvPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: projectRootEnvPath, override: false });
}

const configs = {
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API || '',
    mongoUri: process.env.MONGO_URI || '',
    port: Number(process.env.PORT) || 3000
};

export default configs;

