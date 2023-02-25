exports.ValidateId = (req, res, next, val) => {
  if (!val) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  next();
};
