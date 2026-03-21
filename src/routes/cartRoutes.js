import { Router } from 'express';
import { Cart } from '../models/cart.js';
const router = Router();

router.get('/api/cart', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.status(200).json(cart);
});

router.put('/api/cart/update', async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });

  const item = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = quantity;

  await cart.save();

  res.status(200).json(cart);
});
router.post('/api/cart/checkout', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // тут зазвичай створюється Order

  // const order = await Order.create(...)

  cart.items = [];
  await cart.save();

  res.status(200).json({ message: 'Checkout successful' });
});

export default router;
