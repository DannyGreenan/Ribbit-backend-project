const express = require("express");
const app = express();
const topicsRouter = require("./routers/topics-routers");
const apiRouter = require("./routers/api-router");
const getArticleByIdRouter = require("./routers/article-routers");

app.use(express.json());

app.use(apiRouter);

app.use(topicsRouter);

app.use(getArticleByIdRouter);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Article not found" });
  } else next();
});

app.use((err, req, res, next) => {
  console.log(err, "<-- Middleware caught error");
});

module.exports = app;
