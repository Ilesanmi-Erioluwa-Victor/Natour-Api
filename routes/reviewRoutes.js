const express = require("express");
const reviewCtrl = require("../controllers/reviewCtrl");
const authCtrl = require("../controllers/authCtrl");
const router = express.Router();

router
  .route("/")
  .get(reviewCtrl.getAllReviews)
  .post(authCtrl.protect, reviewCtrl.createReview);

module.exports = router;
