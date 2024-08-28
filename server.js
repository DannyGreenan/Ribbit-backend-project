const express = require("express");
const app = express();
const topicsRouter = require("./routers/topics-routers");
const apiRouter = require("./routers/api-router");
const getArticlesRouter = require("./routers/article-routers");
const commentRouter = require("./routers/comment-routers");
const userRouter = require("./routers/user-routers");

app.use(express.json());

app.use(apiRouter);

app.use(topicsRouter);

app.use(getArticlesRouter);

app.use(commentRouter);

app.use(userRouter);

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.status === 400) {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.msg === "Article not found") {
    res.status(404).send({ msg: "Article not found" });
  } else if (err.msg === "Comments not found") {
    res.status(404).send({ msg: "Comments not found" });
  } else if (err.msg === "Comment not found") {
    res.status(404).send({ msg: "Comment not found" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Article not found" });
  } else if (err.code === "23502" || err.code === "23503") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 406) {
    res.status(406).send({ msg: "Not Acceptable" });
  }
  next(err);
});

// app.use((err, req, res, next) => {
//   console.log(err, "Middleware caught error");
//   next(err);
// });

module.exports = app;
