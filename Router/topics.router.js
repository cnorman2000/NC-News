const topicsRouter = require("express").Router();

const { getTopics } = require("../Controllers/topics.controller");

topicsRouter.get("/", getTopics)

module.exports = topicsRouter;