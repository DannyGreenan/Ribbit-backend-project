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
  deleteArticle,
} = require("../controllers/article-controllers");

router
  .route("/api/articles/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticle)
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
