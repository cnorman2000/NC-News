const usersRouter = require("express").Router();

const { fetchUsers } = require("../Controllers/users.controller");

usersRouter.get("/", fetchUsers);

module.exports = usersRouter;
