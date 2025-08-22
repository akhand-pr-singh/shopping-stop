const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth.isAuthenticatedUser, createPaymentIntent);

module.exports = router;