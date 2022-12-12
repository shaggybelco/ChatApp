module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        name: String,
        cellphone: Number,
        password: String,
      },
      { timestamps: true }
    )
  );

  return User;
};
