const express = require("express");
const router = express.Router();
const {
  getTopics,
  handleInvalidMethod,
} = require("../controllers/topic-controllers");

router.route("/api/topics").get(getTopics).all(handleInvalidMethod);

module.exports = router;
