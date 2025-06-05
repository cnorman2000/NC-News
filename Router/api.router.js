const apiRouter = require("express").Router();

const { getApi } = require("../Controllers/api.controller");

apiRouter.get("/", getApi);

module.exports = apiRouter;