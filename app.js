const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const {
  handleServerErrors,
  handleCustomErrors,
  handlePostgressErrors,
} = require("./errors");

const apiRouter = require("./Router/api.router");
const topicsRouter = require("./Router/topics.router");
const articlesRouter = require("./Router/articles.router");
const usersRouter = require("./Router/users.router");
const commentsRouter = require("./Router/comments.router");

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.use(handlePostgressErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
