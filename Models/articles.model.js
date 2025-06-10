const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id):: INT AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "not found",
        });
      }
      return rows[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [article_id, inc_votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

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
//     });
