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
  // console.log(err, "<-- Middleware caught error");
  if (err.msg === "Article not found")
    res.status(404).send({ msg: "Article not found" });
  if (err.msg === "Bad request") res.status(400).send({ msg: "Bad request" });
  next();
});

module.exports = app;
