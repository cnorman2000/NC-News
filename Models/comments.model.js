const db = require("../db/connection");

exports.selectCommentsByArticle = (article_id) => {
  let sqlQuery = `SELECT * FROM comments
      WHERE comments.article_id = ${article_id}
      ORDER BY created_at DESC `;
  console.log(sqlQuery);
  return db.query(sqlQuery).then(({ rows }) => {
    return rows;
  });
};

exports.addComment = (article_id, username, body) => {
  console.log("comments model");

  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
