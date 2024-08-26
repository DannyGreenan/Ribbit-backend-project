const express = require("express");
const router = express.Router();
const {
  getApi,
  handleInvalidMethod,
} = require("../controllers/api-controllers");

router.route("/api").get(getApi).all(handleInvalidMethod);

module.exports = router;
