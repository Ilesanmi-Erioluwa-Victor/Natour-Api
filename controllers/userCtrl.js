const httpStatus = require("http-status");

exports.getAllUsers = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "This route is not yet is not yet defined "
  });
};

exports.createUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "This route is not yet is not yet defined "
  });
};

exports.getUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "This route is not yet defined.."
  });
};

exports.updateUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "This route is not yet is not yet defined "
  });
};

exports.deleteUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "This route is not yet is not yet defined "
  });
};
