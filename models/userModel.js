const mongoose = require("mongoose");

const userSchema = new mongoose({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
