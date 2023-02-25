const fs = require("fs");
const httpStatus = require("http-status");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(newId => newId.id === id);

  if (!tour) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(httpStatus.CREATED).json({
        status: "success",
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: { tour: "Updated" }
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    data: { tour: null }
  });
};
