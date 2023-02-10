const db = require("../models");
const Chat = db.chat;

const Conversation = db.conversation;
const Message = db.message;

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
      User.findOneAndUpdate(
        { _id: req.body.sender },
        { $push: { chats: chat._id } },
        (error) => {
          if (error) return console.error(error);

          User.findOneAndUpdate(
            { _id: req.body.receiver },
            { $push: { chats: chat._id } },
            (error) => {
              if (error) return console.error(error);

              console.log("Users updated successfully");
            }
          );
        }
      );
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
        },
        {
          path: "receiver",
          model: "users",
        },
      ])
      .populate({
        path: "lastMessage",
        model: "chats",
      })
      .exec((error, chat) => {
        // console.log(chat);
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
            { sender: req.params.sender, receiver: req.params.receiver },
            { sender: req.params.receiver, receiver: req.params.sender },
          ],
        },
      })

      .sort({ timestamp: 1 })
      // .populate({ path: "receiver", model: "users" })
      .exec((error, chat) => {
        // console.log(chat);
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
exports.update = (req, res, next) => {
  try {
    Chat.updateMany(
      { receiver: req.params.receiver, isRead: false },
      { $set: { isRead: req.body.isRead } },
      (error, result) => {
        if (error) {
          res.status(400).json(error);
        }
        console.log(result);

        res.status(200).json(result);
      }
    );
  } catch (error) {
    next(error);
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = () => {};

// send message using conversations
exports.sendMessage = async (req, res, next) => {
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [req.params.sender, req.params.receiver] },
    });

    if (!conversation) {
      conversation = await new Conversation({
        members: [req.params.sender, req.params.receiver],
      }).save();
    }

    const message = await new Message({
      sender: req.params.sender,
      conversation: conversation._id,
      message: req.body.message,
    }).save();

    res.status(200).json(message);
    // return message;
  } catch (error) {
    next(error);
  }
};

exports.getConversation = async (req, res, next) => {
  console.log("++++++++++++++++++++++++");

  const loggedInUserId = req.params.id;
  console.log(loggedInUserId);
  // const getLastMessage = async (conversationId) => {
  //   try {
  //     const message = await Message.findOne({
  //       conversation: conversationId,
  //     }).sort({ createdAt: -1 });
  
  //     return message;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  
  // try {
  //   const conversations = await Conversation.find({
  //     members: { $in: [loggedInUserId] },
  //   });

  //   const chatHistory = [];

  //   for (const conversation of conversations) {
  //     const otherUserId = conversation.members.find((m) => m !== loggedInUserId);
  //     const lastMessage = await getLastMessage(conversation._id);

  //     chatHistory.push({
  //       userId: otherUserId,
  //       lastMessage,
  //     });
  //   }

  //   res.status(200).json(chatHistory)
  // } catch (error) {
  //   throw error;
  // }

  Message.aggregate([
    {
      $match: {
        sender: loggedInUserId
      }
    },
    {
      $lookup: {
        from: "conversations",
        localField: "conversation",
        foreignField: "_id",
        as: "conversation"
      }
    },
    {
      $sort: {
        timestamp: -1
      }
    },
    {
      $group: {
        _id: "$conversation._id",
        conversation: { $first: "$conversation" },
        lastMessage: { $first: "$message" },
        timestamp: { $first: "$timestamp" }
      }
    }
  ]).exec((err, results)=>{
    console.log(results);
    res.status(200).json(results)
  })
  
  
};
