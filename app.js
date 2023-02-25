const fs = require('fs');
const httpStatus = require('http-status');
const express = require('express');

const app = express();

app.use(express.json());



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Get all tours...
app.get('/api/v1/tours', (req, res) => {
  res.status(httpStatus.OK).json({
    status: 'success',
    result : tours.length,
    data: { tours }
  });
});


// Create new Tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(httpStatus.CREATED).json({
      status: "success",
      data: {
        tour : newTour
      }
   })
  });
});

// Get a tour
app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find(newId => newId.id === id);

  if (!tour) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tour },
  });
});

// Update a tour with Patch method
app.patch("/api/v1/tours/:id", (req, res) => {

  if (parseInt(req.params.id) > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tour: "Updated" },
  });
});

// Delet a tour with 
app.delete("/api/v1/tours/:id", (req, res) => {

    if (parseInt(req.params.id) > tours.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: { tour : null },
    });
})
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
