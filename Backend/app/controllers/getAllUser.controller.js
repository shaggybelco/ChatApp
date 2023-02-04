const { chat } = require("../models");
const db = require("../models");
const User = db.user;
const Chat = db.chat;

exports.getUser = async (req, res)=>{
    try {
        const users = await User.find({_id: { $ne: req.params.userId }}).populate({
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
          });
        res.status(200).json({users: users})
    } catch (error) {
        res.status(500).json({error: 'DB error'})
    }
}

exports.getUserWithMessage = async (req, res)=>{
    const lastMessages = await chat.aggregate([
        {
            "$group": {
                "_id": "$sender",
                "lastMessage": { "$last": "$message" },
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "_id",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$unwind": "$user"
        },
        {
            "$project": {
                "userName": "$user.name",
                "lastMessage": "$lastMessage",
                "chats": "$user.chats"
            }
        }
    ]);
    
      console.log(lastMessages);

      res.status(200).json(lastMessages);
}