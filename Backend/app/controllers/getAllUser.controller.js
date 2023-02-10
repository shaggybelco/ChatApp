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
          }).populate({
            path: 'chats',
            model: 'chats'
          })
          .then((users) => {
            const usersWithUnreadCount = users.map((user) => {
              return {
                ...user.toJSON(),
                unreadCount: user.chats.filter((chat) => !chat.isRead).length,
              };
            });
        
            res.status(200).json( usersWithUnreadCount );
          });

          //  console.log(lastMessage);
        });
    });
  // console.log(lastMessages);

  // res.status(200).json(lastMessages);
};

exports.getMe = async(req, res, next)=>{
  try {
     const hold = await User.find({_id: req.params.id});

       res.status(200).json(hold);
  } catch (error) {
    next(error)
  }

  exports.updateProfile = async (req, res, next) => {
    const { image } = req.body;
    const { id } = req.params.id;
    try {
      const results = await cloudinary.uploader.upload(image, {
        folder: "chatPP",
      });
  
      console.log(results)
  
      const updated = User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { avatar: results.secure_url, isAvatar: true } },
        { returnOriginal: false },
        (error) => {
          if (error) return console.error(error);
        }
      );
  
      res.status(200).json(updated);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}