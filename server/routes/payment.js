const express = require('express');
const router = express.Router();
const { createCheckoutSession  } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/create-checkout-session', auth.isAuthenticatedUser, createCheckoutSession );

module.exports = router;