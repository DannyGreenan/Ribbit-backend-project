const express = require("express");
const { getTopics } = require("./controllers/topic-controllers");
const app = express();
const topicsRouter = require("./routers/topics-routers");

app.use(express.json());

// app.get("/api/topics", getTopics);

app.use(topicsRouter);

app.use((err, req, res, next) => {
  console.log(err, "<-- Middleware caught error");
});

module.exports = app;
