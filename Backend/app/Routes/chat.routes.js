const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const controller = require("../controllers/chat.controller");

app.post("/chat", controller.create);
app.get('/chat/:sender/:receiver',controller.findOne);
app.get('/update/:receiver', controller.update);

module.exports = app;