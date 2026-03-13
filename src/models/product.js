import { Schema, model } from 'mongoose';
import { CATEGORIES } from '../constants/filter.js';

const productSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, name: 'text' });

export const Product = model('Product', productSchema);
