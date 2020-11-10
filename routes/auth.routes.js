var express = require("express");
var router = express.Router();

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/signin", controller.signin);
module.exports = router;
