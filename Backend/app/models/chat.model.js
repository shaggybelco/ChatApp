module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      message: String,
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Chat = mongoose.model("chats", schema);
  return Chat;
};
