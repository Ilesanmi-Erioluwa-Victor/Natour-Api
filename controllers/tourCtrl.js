const httpStatus = require("http-status");
const Tour = require("../models/tourModel");
const APIFeatures = require("../Utils/apifeactures");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  res.status(httpStatus.CREATED).json({
    status: "success",
    data: {
      tour
    }
  });
});

exports.aliasesTopTours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // EXECUTE THE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  res.status(httpStatus.OK).json({
    status: "success",
    // requestedAt: req.requestTime
    result: tours.length,
    data: { tours }
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id).populate({
    path: "guides",
    select: "- __v"
  });

  if (!tour) {
    return next(
      new AppError(`Sorry, no tour found with that ID, try again later`, 404)
    );
  }
  res.status(httpStatus.OK).json({
    status: "success",
    data: { tour }
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tour) {
    return next(
      new AppError(`Sorry, no tour found with that ID, try again later`, 404)
    );
  }
  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      tour
    }
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return next(
      new AppError(`Sorry, no tour found with that ID, try again later`, 404)
    );
  }
  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    data: { tour: null }
  });
});

exports.getToursStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        avgRating: { $avg: "$ratingsAverage" },
        numTours: { $sum: 1 },
        numsRating: { $sum: "$ratingsQuantity" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    },
    {
      $sort: {
        avgPrice: 1
      }
    }
  ]);

  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" }
      }
    },
    {
      $addFields: {
        month: "$_id"
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: {
        numTourStarts: -1
      }
    }

    // {same as limit in query...
    //   $limit: 12
    // }
  ]);

  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      plan
    }
  });
});
