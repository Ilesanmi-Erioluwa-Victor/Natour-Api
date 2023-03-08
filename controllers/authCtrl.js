const httpStatus = require("http-status");
const User = require("../models/userModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const jwtToken = require("../middlewares/jwtToken");

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwtToken(user._id);
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
    return next(new AppError("Please provided email and password", 400));
  }
  // 2)Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3)if everything is okay, send token to client

  const token = jwtToken(user._id);
  res.status(httpStatus.CREATED).json({
    status: "success",
    token,
    data: {
      user
    }
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permissions to perform this action", 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on email Posted
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError("Sorry, there is no user with that email address", 404)
    );
  }
  // 2)Get the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3)send it's to user email
});

exports.resetPassword = catchAsync(async (req, res, next) => {});
