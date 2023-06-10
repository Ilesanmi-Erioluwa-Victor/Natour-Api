const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {}
});
