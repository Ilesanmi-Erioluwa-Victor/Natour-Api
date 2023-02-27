const httpStatus = require("http-status");
const Tour = require("../models/tourModel");
// const ValidateId = require("../middlewares/ValidateId");

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

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1) Filtering
    const objQuery = { ...req.query };
    const excludedField = ["sort", "page", "limit", "fields"];

    excludedField.forEach(el => delete objQuery[el]);

    // 2) ADVANCE FILTERING..
    let queryStr = JSON.stringify(objQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));
    console.log(JSON.parse(queryStr));
    // EXECUTE THE QUERY
    const tours = await query;

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
