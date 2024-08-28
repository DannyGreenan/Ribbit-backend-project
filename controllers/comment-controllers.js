const { deleteCommentById } = require("../models/comment-models");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then((msg) => {
      res.status(204).send({ msg });
    })
    .catch((err) => {
      next(err);
    });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "DELETE");
  res.status(405).send({ msg: "Method Not Allowed" });
};
