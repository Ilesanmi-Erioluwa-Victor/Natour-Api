const express = require("express");

const router = express.Router();

const ValidateId = require("../middlewares/ValidateId");
const tourCtrl = require("./../controllers/tourCtrl");

// router.param("id", ValidateId);

router.route("/top-5-cheap")

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
