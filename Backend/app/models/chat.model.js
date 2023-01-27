module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      sender: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
      reciever: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
      message: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Chat = mongoose.model("chat", schema);
  return Chat;
};
