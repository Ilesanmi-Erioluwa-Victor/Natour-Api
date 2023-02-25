const httpStatus = require("http-status");

exports.ValidateId = (req, res, next, val) => {
  if (!val) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  next();
};
