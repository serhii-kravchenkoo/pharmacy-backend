import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const productsQuery = Product.find();
  const [totalItems, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(limit),
  ]);
  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({ page, limit, totalItems, totalPages, products });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};
