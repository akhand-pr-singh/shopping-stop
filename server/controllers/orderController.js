const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

// ✅ Used by webhook after Stripe confirms payment
exports.placeOrderAfterPayment = async (userId, session) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) return;

  let total = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product?.name || "Unknown product"}`);
    }

    // ✅ Decrease stock
    product.stock -= item.quantity;
    await product.save();

    total += item.quantity * product.price;
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // ✅ Create order with Stripe payment details
  await Order.create({
    user: userId,
    items: orderItems,
    total,
    status: "paid",                        // confirmed via webhook
    paymentId: session.payment_intent,     // better than session.id
    paymentStatus: session.payment_status, // optional
  });

  // ✅ Clear cart properly
  cart.items = [];
  cart.itemsCount = 0;
  await cart.save();
};

// ✅ Legacy / manual order placement (COD or testing without Stripe)
exports.placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      product.quantity -= item.quantity;
      await product.save();
      total += item.quantity * product.price;
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      status: "pending",   // since no payment confirmed here
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    next(err);
  }
};

// ✅ Get logged-in user's orders
exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};