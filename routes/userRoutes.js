const express = require("express");
const userCtrl = require("./../controllers/userCtrl");
const authCtrl = require("../controllers/authCtrl");

const router = express.Router();

router.post("/signup", authCtrl.signUp);
router.post("/login", authCtrl.login);

router.post("/forgetPassword", authCtrl.forgotPassword);
router.patch("/resetPassword/:token", authCtrl.resetPassword);

router.route("/").get(userCtrl.getAllUsers);

router
  .route("/:id")
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
