module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const User = mongoose.model(
    'users',
    mongoose.Schema(
      {
        _id: {type: ObjectId, auto: true},
        username: { 
          type: String, 
          required: [true, 'Username is required'] 
        },
        password: { 
          type: String, 
          required: [true, 'Password is required'] 
        },
        email: { 
          type: String,
          required: [true, 'Email is required'],
          validate: {
            validator: function (value) {
              const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
              return emailRegex.test(value);
            },
            message: 'Invalid email format',
          },
         },
        displayName: String,
        accessLevel: { 
          type: Number, 
          default: 1, 
          min: [1, 'Access level must be greater than 1'], 
          max: [5, 'Access level cannot be greater than 5']
        },
      }
    )
  );

  return User;
};
