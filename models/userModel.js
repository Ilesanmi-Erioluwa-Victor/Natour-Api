const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please, provide a valid email"]
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, "Please provide  your password"],
    validate: {
      validator: function(el) {
        // This only work on create and save
        return el === this.password;
      }
    }
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm  your password"]
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
