const db = require("../models");
const Chat = db.chat;

// Create and Save a new Tutorial
exports.create = (req, res) => {
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
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  // const {sender, reciever } = req.body
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const chat = await Chat.find({ reciever: req.params.reciever });
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};
