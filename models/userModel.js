const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Please, provide your email"],
    lowercase: true
  },
  photo: {
    type: String
  },
  password: {
    type: String
  },

  passwordConfirm: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
