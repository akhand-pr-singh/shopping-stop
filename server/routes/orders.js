const express = require('express');
const router = express.Router();
const {placeOrder, getUserOrders} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get all orders route - to be implemented' });
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ message: 'Get single order route - to be implemented' });
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create order route - to be implemented' });
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ message: 'Update order route - to be implemented' });
});

router.post('/place', auth.isAuthenticatedUser, placeOrder);
router.get('/my', auth.isAuthenticatedUser, getUserOrders);

module.exports = router;