const topicsRouter = require("express").Router();

const { fetchTopics } = require("../Controllers/topics.controller");

topicsRouter.get("/", fetchTopics);

module.exports = topicsRouter;
