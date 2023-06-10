const httpStatus = require("http-status");
const catchAsync = require("../Utils/catchAsync");
const Review = require("../models/reviewModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});

  res.status(httpStatus.OK).json({
    status: "Success",
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(httpStatus.CREATED).json({
    status: "Success",
    data: {
      review: newReview
    }
  });
});
