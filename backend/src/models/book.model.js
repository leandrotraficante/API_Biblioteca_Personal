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

const booksModel = mongoose.model(booksCollection, bookSchema);

export default booksModel;
