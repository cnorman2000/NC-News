const usersRouter = require("express").Router();

const { getUsers } = require("../Controllers/users.controller");

usersRouter.get("/", getUsers)

module.exports = usersRouter;