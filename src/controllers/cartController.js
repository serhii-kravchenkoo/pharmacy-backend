import { Cart } from '../models/cart';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.status(200).json(cart);
};

export const updateCart = async (req, res) => {
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
};

export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // тут зазвичай створюється Order

  // const order = await Order.create(...)

  cart.items = [];
  await cart.save();

  res.status(200).json({ message: 'Checkout successful' });
};
