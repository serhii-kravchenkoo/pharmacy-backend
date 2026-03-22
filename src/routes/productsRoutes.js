import { Router } from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productsController.js';
const router = Router();

router.get('/api/products', getProducts);

router.get('/api/products/:id', getProductById);

export default router;
