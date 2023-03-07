const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: {
      user
    }
  });
});
