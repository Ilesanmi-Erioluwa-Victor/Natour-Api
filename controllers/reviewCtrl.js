const catchAsync = require("../Utils/catchAsync");
const Review = require("../models/reviewModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: {
      reviews
    }
  });
});
