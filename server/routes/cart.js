const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart, updateCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth.isAuthenticatedUser, getCart);
router.post('/add', auth.isAuthenticatedUser, addToCart);
router.delete('/remove/:id', auth.isAuthenticatedUser, removeFromCart);
router.post('/clear', auth.isAuthenticatedUser, clearCart);
router.put('/update/:id', auth.isAuthenticatedUser, updateCart);

module.exports = router;