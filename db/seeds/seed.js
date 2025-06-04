const db = require("../connection");
const format = require ('pg-format');
const { convertTimestampToDate, createLookupObject } = require('./utils.js');

const seed = ({ topicData, userData, articleData, commentData }) => {

  return db.query(`DROP TABLE IF EXISTS comments`)
    .then(() => { return db.query(`DROP TABLE IF EXISTS articles`) })
    .then(() => { return db.query(`DROP TABLE IF EXISTS users`) })
    .then(() => {return db.query(`DROP TABLE IF EXISTS topics`)})
    
    
    .then(() => {
      return db.query(`CREATE TABLE 
      topics(slug VARCHAR(50) PRIMARY KEY,
      description VARCHAR,
      img_url VARCHAR(1000))`)
    })

    .then(() => {
      return db.query(`CREATE TABLE 
      users(username VARCHAR(50) PRIMARY KEY,
      name VARCHAR(50),
      avatar_url VARCHAR(1000))`)
    })

    .then(() => {
      return db.query(`CREATE TABLE articles
      (article_id SERIAL PRIMARY KEY, 
      title VARCHAR(200), 
      topic VARCHAR(50) REFERENCES topics(slug), 
      author VARCHAR(50) REFERENCES users(username), 
      body TEXT, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      votes INT DEFAULT 0, 
      article_img_url VARCHAR(1000))`)
    })

    .then(() => {
      return db.query(`CREATE TABLE comments
      (comment_id SERIAL PRIMARY KEY, 
      article_id INT REFERENCES articles(article_id), 
      body TEXT, 
      votes INT DEFAULT 0, 
      author VARCHAR(50) REFERENCES users(username), 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
    })

    .then(() => {
    const formattedTopicValues = topicData.map(({slug, description, img_url}) => {
      return [slug, description, img_url]
    })
      
    const sqlTopicString = format(`INSERT INTO topics(slug, description, img_url) VALUES %L`, formattedTopicValues)
     return db.query(sqlTopicString)   
    })
    
    .then(() => {
      const formattedUserValues = userData.map(({username, name, avatar_url}) => {
        return [username, name, avatar_url]
      })

      const sqlUserString = format(`INSERT INTO users(username, name, avatar_url) VALUES %L`, formattedUserValues)
      return db.query(sqlUserString)   
    })
    
    .then(() => {
      const formatedTimeStamp = articleData.map(convertTimestampToDate)
      const formattedArticleValues = formatedTimeStamp.map(({title, topic, author, body, created_at, votes, article_img_url}) => {
      return [title, topic, author, body, created_at, votes, article_img_url]
      })

      const sqlArticleString = format(`INSERT INTO articles(title, topic, author, body,   created_at, votes, article_img_url) VALUES %L RETURNING *`, formattedArticleValues)
      // console.log(sqlArticleString)
      return db.query(sqlArticleString)   
    })
    
    .then(({ rows }) => {
      // console.log(rows)
      const keys = "title"
      const value = "article_id"
      const lookupObject = createLookupObject(rows, keys, value)
      const formatedTimeStamp = commentData.map(convertTimestampToDate)
      const formattedCommentValues = formatedTimeStamp.map(({article_title, body, votes, author, created_at}) => {
      return [lookupObject[article_title], body, votes, author, created_at]
      })

      const sqlCommentString = format(`INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`, formattedCommentValues)
      console.log(sqlCommentString)
      return db.query(sqlCommentString)
  }) 
  
};
module.exports = seed;
