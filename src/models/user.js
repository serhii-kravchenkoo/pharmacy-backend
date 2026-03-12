import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const User = model('User', userSchema);
