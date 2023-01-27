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

let ch = "";

io.on("connection", (socket) => {

  console.log(socket.id);
  socket.on("send-message", (data) => {
    // mychat
    const chat = new Chat({
      sender: req.body.sender,
      reciever: req.body.reciever,
      message: req.body.message,
    });

    chat
      .save(chat)
      .then((sent) => {
        res.status(200).json({ success: "Message sent", data: sent });
      })
      .catch((error) => {
        res.status(400).json({ error: "Message did not send", data: error });
      });

    //   other chat
    const otherChat = new Chat({
      sender: req.body.reciever,
      reciever: req.body.sender,
      message: req.body.message,
    });

    otherChat
      .save(otherChat)
      .then((sent) => {
        res.status(200).json({ success: "Message sent", data: sent });
      })
      .catch((error) => {
        res.status(400).json({ error: "Message did not send", data: error });
      });
  });
});

// io.of("/").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });

//routes
const reg = require("./app/Routes/register.routes");
const log = require("./app/Routes/login.routes");
const getid = require("./app/Routes/getUserId.routes");
const chat = require("./app/Routes/chat.routes");
const user = require("./app/Routes/getAllUser.routes");

app.use("/api", reg);
app.use("/api", log);
app.use("/api", getid);
app.use("/api", chat);
app.use("/api", user);

server.listen(port, () => {
  console.log(`connect to http://localhost:${port}`);
});
