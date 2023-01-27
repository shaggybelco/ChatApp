module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name: {type: String, unique: true},
        cellphone: Number,
        password: String,
        chatId: {type: mongoose.Schema.Types.ObjectId, ref: 'chat'}
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
