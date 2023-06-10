const express = require("express");
const reviewCtrl = require("../controllers/reviewCtrl");

const router = express.Router();

router
  .route("/")
  .get(reviewCtrl.getAllReviews)
  .post(reviewCtrl.createReview);

module.exports = router;
