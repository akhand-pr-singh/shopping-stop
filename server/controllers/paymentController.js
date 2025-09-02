const stripe = require('../utils/stripe');

exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { items } = req.body; // Example: [{ name: 'Gold Ring', price: 120, quantity: 2 }]
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    const BASE_URL = process.env.NODE_ENV==='development'?process.env.CLIENT_URL_DEV:process.env.CLIENT_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: req.user.email, // optional, auto-fills in Checkout
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      metadata: { userId: req.user.id }, // attach for later reference
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    next(err);
  }
};