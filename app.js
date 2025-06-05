const express = require("express");
const app = express();
const db = require('./db/connection');

const { getApi } = require('./Controllers/api.controller')

app.use(express.json());

app.get('/api', getApi)

app.use(handlePostgressErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;


