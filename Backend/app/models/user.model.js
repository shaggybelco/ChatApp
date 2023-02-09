module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name: String,
        cellphone: { type: Number, unique: true, required: true },
        password: { type: String, required: true },
        isAvatar: {
          type: Boolean,
          default: false,
        },
        avatar: {
          type: String,
          default: "",
        },
      },
      { timestamps: true }
    )
  );

  return User;
};