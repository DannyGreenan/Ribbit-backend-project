const express = require("express");
const router = express.Router();
const {
  getArticleById,
  handleInvalidMethod,
  getAllArticles,
  getArticlesComments,
  postArticleComment,
  patchArticle,
  postArticle,
} = require("../controllers/article-controllers");

router
  .route("/api/articles/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .all(handleInvalidMethod);

router
  .route("/api/articles")
  .get(getAllArticles)
  .post(postArticle)
  .all(handleInvalidMethod);

router
  .route("/api/articles/:article_id/comments")
  .get(getArticlesComments)
  .post(postArticleComment)
  .all(handleInvalidMethod);

module.exports = router;
