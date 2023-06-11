const express = require("express");

const router = express.Router();

// const ValidateId = require("../middlewares/ValidateId");
const tourCtrl = require("./../controllers/tourCtrl");
const reviewCtrl = require("./../controllers/reviewCtrl");
const authCtrl = require("./../controllers/authCtrl");
// router.param("id", ValidateId);

router
  .route("/top-5-cheapTours")
  .get(tourCtrl.aliasesTopTours, tourCtrl.getAllTours);

router.route("/tours-stats").get(tourCtrl.getToursStats);
router.route("/monthly-plan/:year").get(tourCtrl.getMonthlyPlan);

router
  .route("/")
  .get(tourCtrl.getAllTours)
  .post(tourCtrl.createTour);

router
  .route("/:id")
  .get(tourCtrl.getTour)
  .patch(tourCtrl.updateTour)
  .delete(tourCtrl.deleteTour);

module.exports = router;
