const articlesRouter = require("express").Router();

const {
  fetchArticles,
  fetchArticleByID,
  patchByArticleId,
} = require("../Controllers/articles.controller");

const {
  fetchCommentsByArticle,
} = require("../Controllers/comments.controller");
const { postComment } = require("../Controllers/comments.controller.js");

articlesRouter.get("/", fetchArticles);

articlesRouter.get("/:articles_id", fetchArticleByID);

articlesRouter.get("/:articles_id/comments", fetchCommentsByArticle);

articlesRouter.post("/:article_id/comments", postComment);

articlesRouter.patch("/:article_id", patchByArticleId);

module.exports = articlesRouter;
