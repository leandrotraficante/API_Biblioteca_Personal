// Validation constants for books
export const VALID_GENRES = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'unknown'];
export const VALID_READ_STATUS = ['read', 'unread'];

// Utility functions
export const isValidObjectId = (id) => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
};
