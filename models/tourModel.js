const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  rating: {
    type: Number,
    default: 2
  },
  price: {
    type: Number,
    default: 100
  }
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
