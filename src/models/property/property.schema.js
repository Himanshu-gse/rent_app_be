import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bhk: { type: Number, required: true },
    area: { type: Number, required: true }, // Square foot
    bathrooms: { type: Number, required: true },
    hospitalsNearby: { type: Number, required: true },
    collegesNearby: { type: Number, required: true },
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model('Property', propertySchema);

export default PropertyModel;
