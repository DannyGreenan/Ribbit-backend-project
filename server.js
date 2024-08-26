const express = require("express");
const app = express();
const topicsRouter = require("./routers/topics-routers");
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use(apiRouter);

app.use(topicsRouter);

app.use((err, req, res, next) => {
  console.log(err, "<-- Middleware caught error");
});

module.exports = app;
