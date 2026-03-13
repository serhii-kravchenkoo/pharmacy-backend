import { Schema } from 'mongoose';
import { model } from 'mongoose';

const reviewSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Review = model('Review', reviewSchema, 'customer-reviews');
