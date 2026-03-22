import { Router } from 'express';
import {
  createOrder,
  getCart,
  updateCart,
} from '../controllers/cartController.js';
const router = Router();

router.get('/api/cart', getCart);

router.put('/api/cart/update', updateCart);
router.post('/api/cart/checkout', createOrder);

export default router;
