const {
  articleById,
  returnArticles,
  returnsArticlesComments,
  postNewComment,
} = require("../models/article-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  articleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  returnArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesComments = (req, res, next) => {
  const { article_id } = req.params;
  returnsArticlesComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postNewComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err, req);
    });
};
exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
