var express = require('express');
var router = express.Router();

const { auth } = require("../middlewares/");
const controller = require("../controllers/user.controller");

  router.get("/all", controller.allAccess);

  router.get("/user", [auth.verifyToken], controller.userBoard);

  router.get(
    "/mod",
    [auth.verifyToken, auth.isModerator],
    controller.moderatorBoard
  );

  router.get(
    "/admin",
    [auth.verifyToken, auth.isAdmin],
    controller.adminBoard
  );

  module.exports = router;