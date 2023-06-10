const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    slug: String,
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
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Tour difficulty is neither Easy, Medium or Difficult."
      }
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // This key word won't work on updating of file, only work for creating file..
          return val < this.price;
        },
        message: "Discount price ({VALUE}) must be lesser than regular price"
      }
    },

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
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },

    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"]
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ]
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
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: "guides",
    select: "-__v"
  });
  // Same as populate
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
