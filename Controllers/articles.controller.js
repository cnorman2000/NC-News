const { selectArticles } = require('../Models/articles.model');

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
    next(err)
  });
}