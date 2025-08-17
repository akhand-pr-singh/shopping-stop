const express = require('express');
const router = express.Router();

const {
  getProducts,
  searchProducts,
  getCategories,
  getBrands,
  getFeaturedProducts,
  getRelatedProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products with filters and pagination
// @access  Public
router.route('/').get(getProducts);

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.route('/search').get(searchProducts);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.route('/categories').get(getCategories);

// @route   GET /api/products/brands
// @desc    Get all product brands
// @access  Public
router.route('/brands').get(getBrands);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.route('/featured').get(getFeaturedProducts);

// @route   GET /api/products/:id/related
// @desc    Get related products
// @access  Public
router.route('/:id/related').get(getRelatedProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.route('/:id').get(getSingleProduct);

// @route   POST /api/products/new
// @desc    Create a product
// @access  Private
router.route('/new').post(newProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private
router.route('/:id').put(updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private
router.route('/:id').delete(deleteProduct);

// @route   PUT /api/products/review
// @desc    Create/Update product review
// @access  Private
router.route('/review').put(createProductReview);

// @route   GET /api/products/reviews
// @desc    Get product reviews
// @access  Public
router.route('/reviews').get(getProductReviews);

// @route   DELETE /api/products/reviews
// @desc    Delete product review
// @access  Private
router.route('/reviews').delete(deleteReview);

module.exports = router; 