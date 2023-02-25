const fs = require('fs');
const express = require('express');
const httpStatus = require('http-status');
const morgan = require('morgan');

const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(httpStatus.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((newId) => newId.id === id);

  if (!tour) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(httpStatus.CREATED).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tour: 'Updated' },
  });
};

const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(httpStatus.NO_CONTENT).json({
    status: 'success',
    data: { tour: null },
  });
};

// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// same as above..

const getAllUsers = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'This route is not yet defined..',
  });
};

const createUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'This route is not yet defined..',
  });
};

const getUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'This route is not yet defined..',
  });
};

const updateUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'This route is not yet defined..',
  });
};

const deleteUser = (req, res) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'This route is not yet defined..',
  });
};

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
