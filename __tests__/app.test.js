const endpointsJson = require("../endpoints.json");
const db = require('../db/connection');
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require('../db/data/test-data');
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');

/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed({ articleData, commentData, topicData, userData }));

afterAll(() => db.end());


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint",
    () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
    });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object with a key of topics and a value of an array of topic objects, each of which should have a slug and a description",
    () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics.length).toBe(3);
          topics.forEach(topic => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
})

describe("GET /api/articles", () => {
  test("200: Responds with an object with a key of articles and a value of an array of article objects, each of which should have an author, title, article_id, topic, created_at, votes, article_image_url and comment count",
    () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).toBe(13);
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string")
            expect(typeof article.title).toBe("string")
            expect(typeof article.article_id).toBe("number")
            expect(typeof article.topic).toBe("string")
            expect(typeof article.created_at).toBe("string")
            expect(typeof article.votes).toBe("number")
            expect(typeof article.article_img_url).toBe("string")
            expect(typeof article.comment_count).toBe("number")
          })
      })
    
    })
  test("200: The object that is returned will be sorted according to the values in the articles.created_at column", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles[0].article_id).toBe(3)
        expect(articles[1].article_id).toBe(6)
        expect(articles[2].article_id).toBe(2)

      })
  })
})

describe("GET /api/users", () => {
  test("200: Responds with an object with a key of users and a value of an array of user objects, each of which should have a username, name and avatar_url",
    () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(4);
          users.forEach( user => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          })
        })
    })
})