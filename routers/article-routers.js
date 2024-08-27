const express = require("express");
const router = express.Router();
const {
  getArticleById,
  handleInvalidMethod,
} = require("../controllers/article-controllers");

router
  .route("/api/articles/:article_id")
  .get(getArticleById)
  .all(handleInvalidMethod);

module.exports = router;
