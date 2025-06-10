const articlesRouter = require("express").Router();

const {
  fetchArticles,
  fetchArticleByID,
  patchByArticleId,
} = require("../Controllers/articles.controller");

const {
  fetchCommentsByArticle,
  postComment,
} = require("../Controllers/comments.controller");

articlesRouter.get("/", fetchArticles);

articlesRouter.get("/:articles_id", fetchArticleByID);

articlesRouter.get("/:articles_id/comments", fetchCommentsByArticle);

articlesRouter.post("/:article_id/comments", postComment);

articlesRouter.patch("/:articles_id", patchByArticleId);

module.exports = articlesRouter;
