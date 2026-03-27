import { Router } from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productsController.js';
import { celebrate } from 'celebrate';
import {
  getAllProductsSchema,
  productIdSchema,
} from '../validations/productsValidation.js';
const router = Router();

router.get('/api/products', celebrate(getAllProductsSchema), getProducts);

router.get('/api/products/:id', celebrate(productIdSchema), getProductById);

export default router;
