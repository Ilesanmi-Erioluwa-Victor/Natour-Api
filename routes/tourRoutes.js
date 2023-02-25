const fs = require('fs');
const express = require('express');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
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


router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
