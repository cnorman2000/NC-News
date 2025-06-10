const {
  selectArticles,
  selectArticleByID,
} = require("../Models/articles.model");

exports.fetchArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchArticleByID = (req, res, next) => {
  const article_id = req.params.articles_id;
  selectArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  if (inc_votes === undefined) {
    return next({
      status: 400,
      msg: "Bad request - no votes",
    });
  }
  if (typeof inc_votes !== "number") {
    return next({ status: 400, msg: "Bad request - no votes" });
  }
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
