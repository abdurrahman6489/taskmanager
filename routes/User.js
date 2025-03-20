const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/User");
const endPointsObj = {
  signup: "/signup",
  login: "/login",
};

router.post(endPointsObj.signup, UserController.signupUser);
router.post(endPointsObj.login, UserController.loginUser);

module.exports = router;
