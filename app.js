const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const httpStatus = require("http-status");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./controllers/errorCtrl");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const Limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from your IP address, please try agin in an hour time.",
  standardHeaders: true
});

// To avoid users making more than 200 requests on the same IP address
app.use("/api", Limiter);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// For getting time
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
