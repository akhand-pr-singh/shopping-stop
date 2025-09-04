const stripe = require('../utils/stripe');
const { placeOrderAfterPayment } = require('./orderController');

exports.stripeWebhook = async (req, res) => {
  let event;

  const WEBHOOK_SECRET_KEY = process.env.NODE_ENV==='development'?process.env.STRIPE_WEBHOOK_SECRET_DEV:process.env.STRIPE_WEBHOOK_SECRET

  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(
      req.body, // must be raw body
      sig,
      WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    try {
      await placeOrderAfterPayment(userId, session);
      console.log(`✅ Order placed for user ${userId} after successful payment`);
    } catch (err) {
      console.error("❌ Order placement failed:", err.message);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object;
    console.error(`❌ Payment failed for intent ${intent.id}`);
  }

  res.sendStatus(200);
};