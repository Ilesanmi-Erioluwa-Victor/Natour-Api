const mongoose = require("mongoose");

const ValidateId = id => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) throw new Error("Invalid Id passed, check your Id");
};

module.exports = ValidateId;
