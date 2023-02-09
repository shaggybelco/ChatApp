module.exports = (mongoose) => {
  const Conversation = mongoose.model(
    "conversation",
    mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      date_created: {
        type: Date,
        default: Date.now,
      },
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    })
  );

  return Conversation;
};
