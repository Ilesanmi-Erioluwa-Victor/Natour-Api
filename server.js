const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env"
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(con => {
  console.log(con.connection);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}..`);
});
