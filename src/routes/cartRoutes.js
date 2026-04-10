import { Router } from 'express';
import {
  createOrder,
  getCart,
  updateCart,
} from '../controllers/cartController.js';
import { celebrate } from 'celebrate';
import { updateCartSchema } from '../validations/checkoutValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/api/cart', authenticate);

router.get('/api/cart', getCart);
router.put('/api/cart/update', celebrate(updateCartSchema), updateCart);
router.post('/api/cart/checkout', createOrder);

export default router;
