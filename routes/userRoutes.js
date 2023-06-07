const express = require("express");
const userCtrl = require("./../controllers/userCtrl");
const authCtrl = require("../controllers/authCtrl");

const router = express.Router();

router.post("/signup", authCtrl.signUp);
router.post("/login", authCtrl.login);

router.post("/forgetPassword", authCtrl.forgotPassword);
router.patch("/resetPassword/:token", authCtrl.resetPassword);

router.patch("/updateMyPassword", authCtrl.protect, authCtrl.updatePassword);

router.patch("/updateMe", authCtrl.protect, userCtrl.updateMe);
router.delete("/deleteMe", authCtrl.protect, userCtrl.deleteMe);

router.route("/").get(userCtrl.getAllUsers);

router
  .route("/:id")
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
