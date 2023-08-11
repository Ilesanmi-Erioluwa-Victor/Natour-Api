const express = require("express");

// const router = express.Router();
const router = express.Router({ mergeParams: true });

// const ValidateId = require("../middlewares/ValidateId");
const tourCtrl = require("./../controllers/tourCtrl");
// const reviewRoute = require("./../controllers/reviewCtrl");
const authCtrl = require("./../routes/reviewRoutes");
// router.param("id", ValidateId);
// router.use("/:tourId/reviews", reviewRoute);

router
  .route("/top-5-cheapTours")
  .get(tourCtrl.aliasesTopTours, tourCtrl.getAllTours);

router.route("/tours-stats").get(tourCtrl.getToursStats);
router.route("/monthly-plan/:year").get(tourCtrl.getMonthlyPlan);

router
  .route("/")
  .get(authCtrl.protect, tourCtrl.getAllTours)
  .post(tourCtrl.createTour);

router
  .route("/:id")
  .get(tourCtrl.getTour)
  .patch(tourCtrl.updateTour)
  .delete(
    authCtrl.protect,
    authCtrl.restrictTo("admin", "lead-guide"),
    tourCtrl.deleteTour
  );

module.exports = router;
