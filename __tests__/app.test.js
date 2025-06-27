const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");

/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed({ articleData, commentData, topicData, userData }));

afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object with a key of topics and a value of an array of topic objects, each of which should have a slug and a description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object with a key of articles and a value of an array of article objects, each of which should have an author, title, article_id, topic, created_at, votes, article_image_url and comment count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
  test("200: The object that is returned will be sorted according to the values in the articles.created_at column", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles[0].article_id).toBe(3);
        expect(articles[1].article_id).toBe(6);
        expect(articles[2].article_id).toBe(2);
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an object with a key of users and a value of an array of user objects, each of which should have a username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object with a key of article and a value of an article object which should have the following properties, author, title, article_id, body, topic, created_at, votes and article_img_url", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("400: Bad request error handling", () => {
    return request(app)
      .get("/api/articles/thisShouldError")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: Not found error handling", () => {
    return request(app)
      .get("/api/articles/7777")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(3);
        });
      });
  });
  test("200: Responds with an empty array when the article_id exists but has no associated comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(0);
      });
  });
  test.skip("400: Bad request error handling", () => {
    return request(app)
      .get("/api/articles/badRequest/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("200: Request body accepts an object with username and body, adds comment to table, reponds with object with key postedComment containing the posted comment object", async () => {
    const {
      body: { postedComment },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send({ username: "rogersop", body: "test_comment" })
      .expect(200);
    const { comment_id, votes, created_at, author, body, article_id } =
      postedComment;
    expect(Object.keys(postedComment).length).toBe(6);
    expect(typeof comment_id).toBe("number");
    expect(typeof votes).toBe("number");
    expect(typeof created_at).toBe("string");
    expect(author).toBe("rogersop");
    expect(body).toBe("test_comment");
    expect(article_id).toBe(1);
  });
  test("400: responds with an error if req body doesn't contain body key", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send({ username: "rogersop" })
      .expect(400);
    expect(msg).toBe("bad request: request body missing a necessary key");
  });
  test("400: responds with an error if req body doesn't contain username key", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send({ body: "some text" })
      .expect(400);
    expect(msg).toBe("bad request: request body missing a necessary key");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with an unmodified article object when it has 0 votes", () => {
    const incVotes = 0;
    const body = { inc_votes: incVotes };
    return request(app)
      .patch(`/api/articles/1`)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        const { article } = body;
        // console.log(`test ${article}`);
        expect(article.votes).toBe(100);
      });
  });
  test("200: Increase vote counts", () => {
    const newVotes = { inc_votes: 2 };
    return request(app)
      .patch(`/api/articles/1`)
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const {
          author,
          title,
          article_id,
          body: article_body_contents,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(article_id).toBe(1);
        expect(typeof article_body_contents).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(votes).toBe(102);
        expect(typeof article_img_url).toBe("string");
      });
  });
  test("200: Decrease votes count", () => {
    const newVotes = { inc_votes: -7 };
    return request(app)
      .patch(`/api/articles/1`)
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const {
          author,
          title,
          article_id,
          body: article_body_contents,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(article_id).toBe(1);
        expect(typeof article_body_contents).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(votes).toBe(93);
        expect(typeof article_img_url).toBe("string");
      });
  });
});

// describe("PATCH /api/articles/:article_id", () => {
//   test("201: request body accepts an object {inc_votes: newVote} where newVote is an integer, increase or decreases votes val for article with :article_id by newvotes, returns object with updatedArticle key with the updated article object as it's value", async () => {
//     const {
//       body: { updatedArticle },
//     } = await request(app)
//       .patch("/api/articles/1")
//       .send({ inc_votes: -10 })
//       .expect(200);
//     const {
//       author,
//       title,
//       article_id,
//       body,
//       topic,
//       created_at,
//       votes,
//       article_img_url,
//     } = updatedArticle;
//     expect(Object.keys(updatedArticle).length).toBe(8);
//     expect(typeof author).toBe("string");
//     expect(typeof title).toBe("string");
//     expect(article_id).toBe(1);
//     expect(typeof body).toBe("string");
//     expect(typeof topic).toBe("string");
//     expect(typeof created_at).toBe("string");
//     expect(typeof votes).toBe("number");
//     expect(typeof article_img_url).toBe("string");
//   });
// });
