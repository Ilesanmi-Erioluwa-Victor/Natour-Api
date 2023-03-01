const express = require("express");
const morgan = require("morgan");
const httpStatus = require("http-status");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
  res.status(httpStatus.NOT_FOUND).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!!`
  });
});

module.exports = app;
