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
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});