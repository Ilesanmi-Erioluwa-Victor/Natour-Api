const httpStatus = require("http-status");
const Tour = require("../models/tourModel");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const objQuery = { ...this.queryString };
    const excludedField = ["sort", "page", "limit", "fields"];

    excludedField.forEach(el => delete objQuery[el]);
    let queryStr = JSON.stringify(objQuery);
    this.queryStr = this.queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = query.skip(skip).limit(limit);
    return this;
  }
}
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(httpStatus.CREATED).json({
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

exports.aliasesTopTours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    // const objQuery = { ...req.query };
    // const excludedField = ["sort", "page", "limit", "fields"];

    // excludedField.forEach(el => delete objQuery[el]);

    // // 1B) ADVANCE FILTERING..
    // let queryStr = JSON.stringify(objQuery);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr)); same as ApiFeatures

    //2) SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    //   //1) if two tours has same price, then
    //   //2) sort("price ratingsAverage");
    // } else {
    //   // query = query.sort("-createdAt");
    // } same as ApiFeatures.sort()

    //3) FIELD LIMITING
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // 4) PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("Page does not exit!!");
    // }
    // EXECUTE THE QUERY
    const features = new ApiFeatures(Tour.find(), req.query).filter().sort();
    const tours = await features.query;

    res.status(httpStatus.OK).json({
      status: "success",
      // requestedAt: req.requestTime
      result: tours.length,
      data: { tours }
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(httpStatus.OK).json({
      status: "success",
      data: { tour }
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: error
    });
  }
};

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
    const tour = await Tour.findByIdAndDelete(id);
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
