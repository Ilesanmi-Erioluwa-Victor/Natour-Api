const mongoose = require("mongoose");

const userSchema = new mongoose({
  name: {
    type: String,
    require: true
  }
});
