const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"]
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"]
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"]
  },

  ratingsAverage: {
    type: Number,
    default: 2
  },

  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 100
  }
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
