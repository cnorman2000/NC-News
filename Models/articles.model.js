const db = require('../db/connection');

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles;') // don't select all, select specific columns
    .then(({ rows }) => {
      return rows;
    })
}


// aggregate function, JOIN, 