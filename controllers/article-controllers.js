const { articleById } = require("../models/article-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  if (!/^\d+$/.test(article_id)) {
    const error = new Error("Bad Request");
    error.msg = "Bad request";
    error.status = 400;
    return next(error);
  }
  articleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
