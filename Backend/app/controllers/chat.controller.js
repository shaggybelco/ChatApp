const db = require("../models");
const Chat = db.chat;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const chat = new Chat(
      {
          sender: req.body.sender,
          reciever: req.body.reciever,
          message: req.body.message
      }
  )

  chat.save(chat).then((sent)=>{
      res.status(200).json({success: 'Message sent', data: sent});
  }).catch((error)=>{
      res.status(400).json({error: 'Message did not send', data: error})
  })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};