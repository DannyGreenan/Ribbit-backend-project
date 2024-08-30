const {
  deleteCommentById,
  patchCommentVotesById,
  getCommentById,
} = require("../models/comment-models");

exports.getComment = (req, res, next) => {
  const { comment_id } = req.params;

  getCommentById(comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then((msg) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;

  getCommentById(comment_id)
    .then(() => {
      return patchCommentVotesById(comment_id, inc_votes);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "DELETE");
  res.status(405).send({ msg: "Method Not Allowed" });
};
