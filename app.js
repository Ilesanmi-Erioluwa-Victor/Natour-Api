const fs = require('fs');
const httpStatus = require('http-status');
const express = require('express');

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(httpStatus.OK).json({
    status: 'success',
    data: { tours }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
