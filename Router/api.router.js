const apiRouter = require("express").Router();

const { fetchApi } = require("../Controllers/api.controller");

apiRouter.get("/", fetchApi);

module.exports = apiRouter;
