import mongoose from 'mongoose';

// Validation constants for books
export const VALID_GENRES = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'horror', 'drama', 'unknown'];
export const VALID_READ_STATUS = ['read', 'pending', 'reading'];

// Utility functions
export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
