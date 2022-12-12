const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const verifyUser = require("../middlewares/auth.middleware");
const controller = require("../controllers/getUserId.controller");

app.get("/getid", verifyUser, controller.getId);

module.exports = app;