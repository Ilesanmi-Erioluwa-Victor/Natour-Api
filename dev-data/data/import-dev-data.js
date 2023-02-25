const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("../../models/tourModel");

dotenv.config({
  path: "./config.env"
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log(`DB Connected successfully...`);
});

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync("tours-simple.json", "utf-8"));

// Import data to database..
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully uploaded...");
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB COLLECTION
const deleteData = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
