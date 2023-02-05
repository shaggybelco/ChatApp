const { chat } = require("../models");
const db = require("../models");
const User = db.user;
const Chat = db.chat;

exports.getUser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userId } }).populate(
      {
        path: "lastMessage",
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
      }
    );
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
};

exports.getUserWithMessage = async (req, res) => {
  //  console.log(req.params.me)
  User.findOne({ _id: req.params.me })
    .then((user) => {
      Chat.find({ _id: { $in: user.chats } })
        .populate("sender receiver")
        .then((chats) => {
          const chatUsers = new Set();
          //  let lastMessage = null;
          chats.forEach((chat) => {
            chatUsers.add(chat.sender._id.toString());
            chatUsers.add(chat.receiver._id.toString());

            // if (!lastMessage || chat.createdAt > lastMessage.createdAt) {
            //   lastMessage = chat;
            // }
          });
          chatUsers.delete(user._id.toString());
          User.find({ _id: { $in: Array.from(chatUsers) } }).populate({
            path: "lastMessage",
           
            model: "chats",
          })
          .then((users) => {
            //  console.log(users);
            res.status(200).json(users);
          });

          //  console.log(lastMessage);
        });
    });
  // console.log(lastMessages);

  // res.status(200).json(lastMessages);
};
