const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Tour must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
  },
  discount: Number,

  description: {
    type: String,
    required: [true, 'Tour must have a description'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have a image'],
  },
  images: [String],

  createdAT: {
    type: Date,
    default: Date.now(),
  },

  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
