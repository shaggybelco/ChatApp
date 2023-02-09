const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const controller = require("../controllers/chat.controller");

app.post("/chat", controller.create);
app.post('/chat/:sender/:receiver',controller.sendMessage);
app.put('/update/:receiver', controller.update);
app.get('/chats/:id', controller.getConversation);

module.exports = app;