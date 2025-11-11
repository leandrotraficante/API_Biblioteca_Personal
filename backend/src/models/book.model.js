import mongoose from "mongoose";
import { VALID_GENRES, VALID_READ_STATUS } from "../constants/validation.js";

const booksCollection = 'books';

const bookSchema = new mongoose.Schema({
    googleId: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 100,
      unique: true,
      sparse: true
    },
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
    normalizedTitle: {
      type: String,
      lowercase: true,
      trim: true
    },
    normalizedAuthor: {
      type: String,
      lowercase: true,
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    },
    genre: {
      type: String,
      trim: true,
      maxlength: 50,
      enum: VALID_GENRES,
      default: 'unknown'
    },
    readStatus: {
      type: String,
      enum: VALID_READ_STATUS,
      default: 'pending'
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
    rate: {
      type: Number,
      min: [0, 'Rate cannot be negative'],
      max: [5, 'Rate cannot be greater than 5'],
      default: 0
    },
    year: {
      type: Number,
      min: [0, 'Year cannot be negative'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
      required: false
    }
  }, {
    timestamps: true,
    collection: booksCollection
  });

bookSchema.pre('save', function normalizeTitleAndAuthor(next) {
  if (this.isModified('title')) {
    this.normalizedTitle = this.title.trim().toLowerCase();
  }
  if (this.isModified('author')) {
    this.normalizedAuthor = this.author.trim().toLowerCase();
  }
  next();
});

bookSchema.pre('findOneAndUpdate', function normalizeTitleAndAuthor(next) {
  const update = this.getUpdate();
  if (!update) {
    return next();
  }
  if (Object.prototype.hasOwnProperty.call(update, 'title')) {
    const title = update.title;
    update.normalizedTitle = typeof title === 'string' ? title.trim().toLowerCase() : title;
  }
  if (Object.prototype.hasOwnProperty.call(update, 'author')) {
    const author = update.author;
    update.normalizedAuthor = typeof author === 'string' ? author.trim().toLowerCase() : author;
  }
  next();
});

const booksModel = mongoose.model(booksCollection, bookSchema);

export default booksModel;
