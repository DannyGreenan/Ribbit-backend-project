const express = require("express");
const app = express();
const cors = require("cors");

const topicsRouter = require("./routers/topics-routers");
const apiRouter = require("./routers/api-router");
const articlesRouter = require("./routers/article-routers");
const commentRouter = require("./routers/comment-routers");
const userRouter = require("./routers/user-routers");

const handleErrors = require("./errorHandlers");

app.use(cors());

app.use(express.json());

app.use(apiRouter);

app.use(topicsRouter);

app.use(articlesRouter);

app.use(commentRouter);

app.use(userRouter);

app.use(handleErrors);

module.exports = app;
