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

  if (id > tours.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  const tour = tours.find(newId => newId.id === id);

  console.log(req.params);
  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tour },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
