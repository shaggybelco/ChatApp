const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const cloudinary = require("../configs/cloudinary.config");

exports.register = async (req, res) => {
  try {
    const user = await User.find({ cellphone: req.body.cellphone });
    console.log(user);

    const SECRET_KEY =
      "iaujshfklausfokjvuorjvksuirefkjauirjkauerfvkajbsru;foajckrabuv";

    if (user.length != 0) {
      res.status(400).json({ error: "User exists" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(400).json({ error: "not protected" });
        }

        const user = new User({
          name: req.body.name,
          cellphone: req.body.cellphone,
          password: hash,
        });

        var flag = 1;

        user
          .save(user)
          .then((data) => {
            const token = jwt.sign(
              {
                id: user._id,
                cellphone: user.cellphone,
                name: user.name,
              },
              SECRET_KEY,
              {
                expiresIn: "5h",
              }
            );
            res
              .status(200)
              .json({ success: "Registered", token: token, data: data });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

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
