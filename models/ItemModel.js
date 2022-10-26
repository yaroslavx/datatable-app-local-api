import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      require: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', ItemSchema);
