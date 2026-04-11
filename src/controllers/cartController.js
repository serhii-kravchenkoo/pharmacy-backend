import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    return res.status(200).json({ items: [] });
  }
  res.status(200).json(cart);
};

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: 'productId and quantity required' });
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  // якщо корзини ще нема — створюємо
  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  // ❌ якщо кількість = 0 → видаляємо товар
  if (quantity === 0) {
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
    }
  }
  // ✅ якщо товар вже є → оновлюємо
  else if (itemIndex !== -1) {
    cart.items[itemIndex].quantity = quantity;
  }
  // ➕ якщо товару нема → додаємо
  else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  res.status(200).json(cart);
};

export const createOrder = async (req, res) => {
  const { userName, phone, email, address } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // отримуємо всі продукти з БД
  const productIds = cart.items.map((item) => item.productId);

  const products = await Product.find({
    _id: { $in: productIds },
  });

  let total = 0;

  const orderItems = cart.items.map((item) => {
    const product = products.find(
      (p) => p._id.toString() === item.productId.toString(),
    );

    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const order = await Order.create({
    userId: req.user._id,
    userName,
    phone,
    email,
    address,
    total,
    items: orderItems,
  });

  // очищаємо корзину
  cart.items = [];
  await cart.save();
  +res.status(201).json(order);
};
