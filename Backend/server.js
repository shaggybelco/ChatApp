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
});

server.listen(port, () => {
  console.log(`connect to http://localhost:${port}`);
});
