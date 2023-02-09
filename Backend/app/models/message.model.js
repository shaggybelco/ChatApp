module.exports = (mongoose) => {
    const Message = mongoose.model(
      "Messages",
      mongoose.Schema(
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
          },
          conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          isRead:{
            type: Boolean,
            default: false
          }
        },
        { timestamps: true }
      )
    );
  
    return Message;
  };
  