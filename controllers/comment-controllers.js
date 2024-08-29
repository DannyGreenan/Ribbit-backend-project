const { deleteCommentById } = require("../models/comment-models");

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

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "DELETE");
  res.status(405).send({ msg: "Method Not Allowed" });
};
