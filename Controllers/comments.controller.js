const {
  selectCommentsByArticle,
  insertComment,
} = require("../Models/comments.model");
const { selectArticleById } = require("../Models/articles.model.js");

exports.fetchCommentsByArticle = (request, res, next) => {
  console.log(request.params);
  const article_id = request.params.articles_id;
  console.log(article_id);
  selectCommentsByArticle(article_id)
    .then((rows) => {
      res.status(200).send({ comments: rows });
    })

    .catch((err) => {
      next(err);
    });
};

exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;

  console.log("comments controller", article_id);
  console.log(username);

  if (!username || typeof username !== "string") {
    return next({
      status: 400,
      msg: "bad request: request body missing a necessary key",
    });
  }
  if (!body || typeof body !== "string") {
    return next({
      status: 400,
      msg: "bad request: request body missing a necessary key",
    });
  }
  insertComment(article_id, username, body)
    .then((postedComment) => {
      response.status(200).send({ postedComment });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
