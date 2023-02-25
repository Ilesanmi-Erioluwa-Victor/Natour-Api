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
