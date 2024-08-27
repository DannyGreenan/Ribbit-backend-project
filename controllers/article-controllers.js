const { articleById } = require("../models/article-models");

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

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
