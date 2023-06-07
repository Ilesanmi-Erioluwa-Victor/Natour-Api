const httpStatus = require("http-status");
const User = require("../models/userModel");
const catchAsync = require("../Utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(httpStatus.CREATED).json({
    status: "success",
    result: users.length,
    data: {
      users
    }
  });
});

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
