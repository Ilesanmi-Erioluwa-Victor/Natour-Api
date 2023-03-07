const mongoose = require("mongoose");
const validator = require("validator");
const bycript = require("bcryptjs");

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
      },
      message: "Password are not matched!"
    }
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm  your password"]
  }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bycript.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
