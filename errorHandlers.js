const handleErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.status === 400 || err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23503") {
    console.log(err);
    if (
      err.constraint === "comments_author_fkey" ||
      err.constraint === "articles_author_fkey"
    ) {
      res.status(404).send({ msg: "User not found" });
    }
    if (err.constraint === "comments_article_id_fkey") {
      res.status(404).send({ msg: "Article not found" });
    }
    if (err.constraint === "articles_topic_fkey") {
      res.status(404).send({ msg: "Topic not found" });
    }
  } else if (
    err.msg === "Article not found" ||
    err.msg === "Comments not found" ||
    err.msg === "Comment not found" ||
    err.msg === "User not found"
  ) {
    res.status(404).send({ msg: err.msg });
  } else if (err.status === 406) {
    res.status(406).send({ msg: "Not Acceptable" });
  } else {
    console.log(err, "Middleware caught error");
    next(err);
  }
};

module.exports = handleErrors;
