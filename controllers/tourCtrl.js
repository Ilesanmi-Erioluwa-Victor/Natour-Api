const httpStatus = require("http-status");
const Tour = require("../models/tourModel");

exports.getAllTours = (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    requestedAt: req.requestTime
    // result: tours.length,
    // data: { tours }
  });
};

exports.getTour = (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success"
    // data: { tour }
  });
};

exports.createTour = (req, res) => {
  res.status(httpStatus.CREATED).json({
    status: "success",
    data: {
      tour: ""
    }
  });
};

exports.updateTour = (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    data: { tour: "Updated" }
  });
};

exports.deleteTour = (req, res) => {
  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    data: { tour: null }
  });
};
