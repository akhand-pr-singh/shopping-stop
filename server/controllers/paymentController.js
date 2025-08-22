const stripe = require('../utils/stripe');

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    // amount should be in cents (e.g., $10 => 1000)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { integration_check: 'accept_a_payment', userId: req.user.id }
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
};