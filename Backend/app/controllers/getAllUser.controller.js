const db = require("../models");
const User = db.user;

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