const express = require("express");
const {
  getUsers,
  handleInvalidMethod,
} = require("../controllers/user-controllers");
const router = express.Router();

router.route("/api/users").get(getUsers).all(handleInvalidMethod);

module.exports = router;
