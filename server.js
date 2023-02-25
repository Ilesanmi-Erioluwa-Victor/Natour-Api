const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env"
});
const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}..`);
});
