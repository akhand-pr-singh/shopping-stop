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
const clientUrl = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_URL 
  : process.env.CLIENT_URL_DEV || 'http://localhost:3000';

// ✅ CORS setup
app.use(cors({
  origin: clientUrl,
  credentials: true
}));

// ✅ Stripe webhook (must come BEFORE express.json)
app.post(
  '/api/webhook/stripe',
  bodyParser.raw({ type: 'application/json' }),
  require('./controllers/stripeController').stripeWebhook
);

// ✅ Regular parsers for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/payment', require('./routes/payment')); // ⚡ use checkoutRoutes here

// ✅ Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shopping Stop API',
    version: '1.0.0',
    status: 'Server is running'
  });
});

// ✅ 404 handler
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// ✅ Error middleware
const errorMiddleware = require('./middleware/errors');
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});