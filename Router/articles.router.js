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

// exports.checkArticleExists = (article_id) => {Add commentMore actions
//   return db
//     .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
//     .then(({ rows }) => {
//       if (!rows.length) {Add commentMore actions
//         return Promise.reject({
//           status: 404,
//           msg: "Not found",
//         });
//       }
//     })
