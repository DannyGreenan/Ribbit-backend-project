const express = require("express");
const {
  getUsers,
  handleInvalidMethod,
  getUserByUsername,
} = require("../controllers/user-controllers");
const router = express.Router();

router.route("/api/users").get(getUsers).all(handleInvalidMethod);

router
  .route("/api/users/:username")
  .get(getUserByUsername)
  .all(handleInvalidMethod);

module.exports = router;
