module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name: String,
        cellphone: {type: Number, unique: true},
        password: String,
        chats: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'chats'
        }]
      },
      { timestamps: true }
    )
  );

  return User;
};


// module.exports = mongoose => {
//   var schema = mongoose.Schema(
//     {
//       name: String,
//         cellphone: Number,
//         password: String,
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const User = mongoose.model("users", schema);
//   return User;
// };
