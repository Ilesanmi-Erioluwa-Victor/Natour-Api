const httpStatus = require("http-status");
const Tour = require("../models/tourModel");
const APIFeatures = require("../Utils/apifeactures");
const catchAsync = require("../Utils/catchAsync");

exports.createTour = catchAsync(async (req, res) => {
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

exports.getAllTours = catchAsync(async (req, res) => {
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

exports.getTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  res.status(httpStatus.OK).json({
    status: "success",
    data: { tour }
  });
});

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(httpStatus.OK).json({
      status: "success",
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      data: { tour: null }
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};

exports.getToursStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};
