module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const User = mongoose.model(
    'users',
    mongoose.Schema(
      {
        _id: {type: ObjectId, auto: true},
        username: String,
        password: String,
        email: String,
        displayName: String,
        accessLevel: Number,
      }
    )
  );

  return User;
};
