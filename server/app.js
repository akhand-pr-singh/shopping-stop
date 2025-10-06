const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Load environment variables
// In Vercel, environment variables are automatically loaded
// Only use config.env for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config.env' });
}

const app = express();

// Check for required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

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
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
  });

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/payment', require('./routes/payment'));

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

module.exports = app;
