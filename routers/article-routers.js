const express = require("express");
const router = express.Router();
const {
  getArticleById,
  handleInvalidMethod,
  getAllArticles,
  getArticlesComments,
} = require("../controllers/article-controllers");

router
  .route("/api/articles/:article_id")
  .get(getArticleById)
  .all(handleInvalidMethod);

router.route("/api/articles").get(getAllArticles).all(handleInvalidMethod);

router
  .route("/api/articles/:article_id/comments")
  .get(getArticlesComments)
  .all(handleInvalidMethod);

module.exports = router;
