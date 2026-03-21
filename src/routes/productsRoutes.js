import { Router } from 'express';
import { Product } from '../models/product.js';
const router = Router();

router.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
});

export default router;
