const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.login = async (req, res) => {
    const {cellphone, password} = req.body;

    try{
        const user = await User.findOne({cellphone: cellphone});
        console.log(user);
        res.status(200).json({user: user})
    }catch(err){
        console.log(err)
    }
}