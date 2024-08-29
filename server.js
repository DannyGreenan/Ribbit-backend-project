const express = require("express");
const app = express();

const topicsRouter = require("./routers/topics-routers");
const apiRouter = require("./routers/api-router");
const getArticlesRouter = require("./routers/article-routers");
const commentRouter = require("./routers/comment-routers");
const userRouter = require("./routers/user-routers");

const handleErrors = require("./errorHandlers");

app.use(express.json());

app.use(apiRouter);

app.use(topicsRouter);

app.use(getArticlesRouter);

app.use(commentRouter);

app.use(userRouter);

app.use(handleErrors);

module.exports = app;
