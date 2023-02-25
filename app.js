const express = require('express');
const httpStatus = require('http-status');
const morgan = require('morgan');

const tourRouter = require("./routes/tourRoutes");
const userRouter = require('./routes/userRoutes');

const app = express();


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
