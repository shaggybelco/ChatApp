const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

const server = require("http").createServer(app);

require("./app/configs/dotenv");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

const db = require("./app/models");

// const db = require("./app/models/");
const Chat = db.chat;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  console.log("here we are");
  res.send("we are here");
});

io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  socket.emit("hello", uuidv4());

  socket.on("send", (data) =>{
    
  });
});

//routes
const reg = require('./app/Routes/register.routes');
const log = require('./app/Routes/login.routes');
const getid = require('./app/Routes/getUserId.routes');
const chat = require('./app/Routes/chat.routes');

app.use('/api', reg);
app.use('/api',log)
app.use('/api', getid);
app.use('/api', chat)

server.listen(port, () => {
  console.log(`connect to http://localhost:${port}`);
});
