const articlesRouter = require("express").Router();

const { getArticles } = require("../Controllers/articles.controller");

articlesRouter.get("/", getArticles)

module.exports = articlesRouter;