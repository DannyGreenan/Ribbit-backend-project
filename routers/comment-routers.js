const express = require("express");
const {
  deleteComment,
  handleInvalidMethod,
} = require("../controllers/comment-controllers");
const router = express.Router();

router
  .route("/api/comments/:comment_id")
  .delete(deleteComment)
  .all(handleInvalidMethod);

module.exports = router;
