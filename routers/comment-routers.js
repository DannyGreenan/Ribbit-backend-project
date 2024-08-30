const express = require("express");
const {
  deleteComment,
  handleInvalidMethod,
  patchCommentVotes,
  getComment,
} = require("../controllers/comment-controllers");
const router = express.Router();

router
  .route("/api/comments/:comment_id")
  .get(getComment)
  .delete(deleteComment)
  .patch(patchCommentVotes)
  .all(handleInvalidMethod);

module.exports = router;
