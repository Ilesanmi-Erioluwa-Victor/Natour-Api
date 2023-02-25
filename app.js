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

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send("Done..")
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
