const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
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
    },
    priceDiscount: Number,

    summary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have an imageCover"]
    },
    images: [String],
    startDates: [Date],
    slug: String
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// Virtual for getting durationWeeks..
tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE : runs before saving of document
tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, {
    replacement: "-",
    lower: true,
    trim: true
  });

  next();
});

// QUERY MIDDLEWARE 

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
