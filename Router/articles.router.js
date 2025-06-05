const articlesRouter = require("express").Router();

const { getArticles, getArticlesByID} = require("../Controllers/articles.controller");

articlesRouter.get("/", getArticles)

// articlesRouter.get("/:article_id", getArticlesByID)

module.exports = articlesRouter;