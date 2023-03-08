const crypto = require("crypto");
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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide  your password"],
    select: false
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm  your password"],
    validate: {
      validator: function(el) {
        // This only work on create and save
        return el === this.password;
      },
      message: "Password are not matched!"
    }
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre("save", async function(next) {
  // Only run this if password is modified
  if (!this.isModified("password")) return next();

  // Hash password with coast of 12
  this.password = await bycript.hash(this.password, 12);

  // Delete passwordConfirm after validating password
  this.passwordConfirm = undefined;
  next();
});

// Check for password confirmation methods
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  // passing in userPassword because, we set select property to false on userSchema property
  return await bycript.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function(JWTTimeStamps) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimeStamps < changeTimeStamp;
  }

  // false means not change
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
};
const User = mongoose.model("User", userSchema);
module.exports = User;
