const db = require("../models");
const Chat = db.chat;
const User = db.user;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // mychat
  const chat = new Chat({
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
  });

  chat
    .save(chat)
    .then((sent) => {
      // for me
      console.log("1 " + req.body.sender);
      User.findOneAndUpdate({ _id: req.body.sender }, { $push: { chats: chat._id } }, (error) => {
        if (error) return console.error(error);
    
        User.findOneAndUpdate({ _id: req.body.receiver }, { $push: { chats: chat._id } }, (error) => {
          if (error) return console.error(error);
    
          console.log('Users updated successfully');
        });
      });
      // for the other
      // console.log("2 " + req.body.receiver);
      // User.updateOne(
      //   { _id: req.body.receiver },
      //   { $push: { chats: sent._id } },
      //   (error) => {
      //     if (error) return console.error(error);

      //     console.log('success');
      //   }
      // );

      console.log(sent);
      res.status(200).json({ success: "Message sent", data: sent });
    })
    .catch((error) => {
      res.status(400).json({ error: "Message did not send", data: error });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async () => {
  // const {sender, reciever } = req.body
};

exports.findChat = async (req, res) => {
  try {
    await Chat.find({
      sender: req.params.sender,
      receiver: req.params.receiver,
    })
      .populate([
        {
          path: "sender",
          model: "users",
        },{
          path: 'receiver',
          model: 'users'
        }
      ])
      .exec((error, chat) => {
        console.log(chat);
        if (error) {
          res.status(400).json(error);
        }

        res.status(200).json(chat);
      });
  } catch (error) {
    console.log(error);
  }
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const user = User.find({_id: req.params.sender});

    console.log(user.paths)
    await User.find({ _id: req.params.sender })
      .populate({
        path: "chats",
        populate: [
          {
            path: "sender",
            model: "users",
          },
          {
            path: "receiver",
            model: "users",
          },
        ],
        model: "chats",
        match: {
          $or: [
            { sender: req.params.sender },
            { receiver: req.params.receiver },
          ],
        },
      })
      // .populate({ path: "receiver", model: "users" })
      .exec((error, chat) => {
        console.log(chat);
        if (error) {
          res.status(400).json(error);
        }

        res.status(200).json(chat);
      });

    // console.log(chat);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
};

// Update a Tutorial by the id in the request
exports.update = () => {};

// Delete a Tutorial with the specified id in the request
exports.delete = () => {};
