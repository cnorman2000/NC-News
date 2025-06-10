const { request } = require("../app");
const {
  selectCommentsByArticle,
  addComment,
} = require("../Models/comments.model");

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

  if (!username || typeof username !== "string") {
    return next({
      status: 400,
      msg: "Bad request - username is not assigned",
    });
  }
  if (!body || typeof body !== "string") {
    return next({
      status: 400,
      msg: "Bad request - body is not assigned",
    });
  }
  addComment(article_id, username, body)
    .then((comment) => {
      response.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
