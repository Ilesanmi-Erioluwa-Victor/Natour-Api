const mongoose = require("mongoose");

const httpStatus = require("http-status");

const ValidateId = (req, res, next, val) => {
  if (!val) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  next();
};

module.exports = ValidateId;
