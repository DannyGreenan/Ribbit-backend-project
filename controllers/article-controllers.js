const {
  articleById,
  returnArticles,
  returnsArticlesComments,
  postNewComment,
  patchArticleById,
} = require("../models/article-models");
const { getAllTopics } = require("../models/topic-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  returnsArticlesComments(article_id)
    .then((comments) => {
      return comments.length;
    })
    .then((comment_count) => {
      return articleById(article_id, comment_count);
    })
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  getAllTopics()
    .then((topics) => {
      const foundTopic = topics.find((topicObj) => topicObj.slug === topic);
      if (topic === undefined) {
        return undefined;
      } else {
        if (foundTopic) {
          return foundTopic.slug;
        } else return Promise.reject({ status: 400, msg: "Bad request" });
      }
    })
    .then(() => {
      return returnArticles(sort_by, order, topic);
    })
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
      next(err);
    });
};
exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  articleById(article_id)
    .then(() => {
      return patchArticleById(article_id, inc_votes);
    })
    .then((article) => {
      res.status(201).send({ article });
    })

    .catch((err) => {
      next(err);
    });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
