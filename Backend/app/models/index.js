const dbConfig = require("../configs/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);
mongoose.set('strictPopulate', false);
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.chat = require("./chat.model.js")(mongoose);
db.user = require('./user.model')(mongoose);
db.message = require('./message.model')(mongoose);
db.conversation = require('./conversation.model')(mongoose);

module.exports = db;