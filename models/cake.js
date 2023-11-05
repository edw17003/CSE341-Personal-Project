module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Cake = mongoose.model(
    'cakes',
    mongoose.Schema(
      {
        name: {
          type: String,
          required: [true, 'Name is required'],
          trim: true,
        },
        flavor: {
          type: String,
          required: [true, 'Flavor is required'],
          trim: true,
        },
        filling: {
          type: String,
          required: [true, 'Filling is required'],
          trim: true,
        },
        theme: {
          type: String,
          required: [true, 'Theme is required'],
          trim: true,
        },
        deliveryDate: {
          type: Date,
          required: [true, 'Delivery date is required'],
        },
        description: {
          type: String,
          trim: true,
        },
      }
    )
  );

  return Cake;
};