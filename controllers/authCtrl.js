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
    token,
    data: {
      user
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password is valid /exist
  if (!email || !password) {
    next(new AppError("Please, provided email and password", 400));
  }
  // 2)Check if user exists and password is correct

  // 3)if everything is okay, send token to client
});
