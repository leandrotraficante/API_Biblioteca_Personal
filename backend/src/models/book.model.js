import mongoose from "mongoose";

const booksCollection = 'books';

const validGenres = ['fiction', 'non-fiction', 'fantasy', 'biography', 'science', 'history', 'unknown'];

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100
    },
    available: {
      type: Boolean,
      default: true
    },
    genre: {
      type: String,
      trim: true,
      maxlength: 50,
      enum: validGenres,
      default: 'unknown'
    },
    readStatus: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread'
    },
    readingDate: {
      type: Date,
      validate: {
        validator: function(value) {
          // Validar que readingDate no sea futura
          return !value || value <= new Date();
        },
        message: props => `Reading date ${props.value} cannot be in the future`
      }
    },
    pages: {
      type: Number,
      min: [1, 'Pages must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Pages must be an integer'
      },
      required: false
    },
    year: {
      type: Number,
      min: [0, 'Year cannot be negative'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
      required: false
    }
  }, {
    timestamps: true
  });

const booksModel = mongoose.model(booksCollection, bookSchema);

export default booksModel;