const httpStatus = require("http-status");

exports.CheckBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "fail",
      message: "Missing name or price"
    });
  }
  next();
};
