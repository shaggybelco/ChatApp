const dbConfig = require("../configs/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.chat = require("./chat.model.js")(mongoose);
db.user = require('./user.model')(mongoose);

module.exports = db;