const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();
const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : process.env.CLIENT_URL_DEV || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin:clientUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/payment', require('./routes/payment'));
// Stripe webhook (must use raw body!)
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Payment success for user:', session.metadata.userId);
    // 👉 Save order in DB here
  }

  res.json({ received: true });
});

// Serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   // Frontend route fallback
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

// Basic route (optional, can be useful for API root check)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shopping Stop API',
    version: '1.0.0',
    status: 'Server is running'
  });
});

// 404 handler (catch unmatched routes)
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error); // Pass to error middleware
});

// Import error handling middleware
const errorMiddleware = require('./middleware/errors');

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});