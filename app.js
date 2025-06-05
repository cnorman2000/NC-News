const express = require("express");
const app = express();
const db = require('./db/connection');

const { getApi } = require('./Controllers/api.controller')

app.use(express.json());

app.get('/api', getApi)

module.exports = app;


