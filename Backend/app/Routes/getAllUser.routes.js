const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const controller = require("../controllers//getAllUser.controller");

app.get("/user", controller.getUser);
app.get('/userl', controller.getUserWithMessage);

module.exports = app;