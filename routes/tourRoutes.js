const express = require("express");

const router = express.Router();
const tourCtrl = require("./../controllers/tourCtrl");

router.param("id", (req, res, next, val) => {
  console.log(`Tour Id is :${val}`);
  next();
});

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
