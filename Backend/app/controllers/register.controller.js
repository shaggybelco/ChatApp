const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    res.status(200).json({user: user})
  }catch(err){
    console.log(err)
  }
};
