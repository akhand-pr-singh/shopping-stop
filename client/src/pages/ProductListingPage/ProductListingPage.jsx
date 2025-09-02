import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import productService from '../../services/productService';
import cartService from '../../services/cartService';
import authService from '../../services/authService';
import { ProductListingTemplate } from '../../components/templates/ProductListingTemplate';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '../../services/axiosInstance';

// ✅ Load Stripe outside of component render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const ProductListingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [cartItemLoading, setCartItemLoading] = useState({ id: null, action: null });

  // Filters and pagination
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  });
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Categories & Brands
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User
  const [user, setUser] = useState(null);

  // ✅ Checkout state
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Load user
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Load categories/brands
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          productService.getCategories(),
          productService.getBrands()
        ]);
        setCategories(categoriesData.categories || []);
        setBrands(brandsData.brands || []);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      }
    };
    loadFilterOptions();
  }, []);

  // Load products
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page: currentPage, limit: 12, ...filters };
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const response = searchTerm
        ? await productService.searchProducts(searchTerm, params)
        : await productService.getProducts(params);

      setProducts(response.products || []);
      setTotalProducts(response.totalProducts || 0);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, searchTerm]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (currentPage > 1) params.set('page', currentPage.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [searchTerm, currentPage, filters, setSearchParams]);

  // Load cart
  const loadCart = useCallback(async () => {
    if (!user) return;
    try {
      const cartData = await cartService.getCart();
      setCartItems(cartData.items || []);
      setCartItemCount(cartData.itemsCount || 0);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Event handlers (search, filter, sort, etc.)
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleUpdateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ category: '', brand: '', minPrice: '', maxPrice: '', rating: '', sortBy: 'newest' });
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSortChange = useCallback((sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    setCurrentPage(1);
  }, []);

  const handleAddToCart = useCallback(async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAddingToCartId(product._id);
    try {
      await cartService.addToCart(product._id, 1);
      await loadCart();
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add product to cart');
    } finally {
      setAddingToCartId(null);
    }
  }, [user, navigate, loadCart]);

  const handleViewProduct = useCallback((product) => {
    navigate(`/products/${product._id}`);
  }, [navigate]);

  // ✅ Checkout handler
  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        setCheckoutError('Stripe.js failed to load');
        setCheckoutLoading(false);
        return;
      }

      // Convert cart items into Stripe line items
      const res = await api.post('/payment/create-checkout-session', {
        items: cartItems.map(item => ({
          name: item.product.name,
          price: item.product.price * 100, // convert to cents
          quantity: item.quantity
        }))
      });

      const { id: sessionId } = res.data;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        setCheckoutError(error.message);
      }
    } catch (err) {
      setCheckoutError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setCheckoutLoading(false);
    }
  }, [cartItems]);

  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleUpdateCartQuantity = useCallback(async (itemId, quantity) => {
    setCartItemLoading({ id: itemId, action: 'update' });
    try {
      await cartService.updateCartItem(itemId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    } finally {
      setCartItemLoading({ id: null, action: null });
    }
  }, [loadCart]);

  const handleRemoveCartItem = useCallback(async (itemId) => {
    setCartItemLoading({ id: itemId, action: 'remove' });
    try {
      await cartService.removeFromCart(itemId);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    } finally {
      setCartItemLoading({ id: null, action: null });
    }
  }, [loadCart]);

  // ✅ Updated: use checkout instead of navigate
  const handleCartCheckout = useCallback(() => {
    setIsCartOpen(false);
    handleCheckout();
  }, [handleCheckout]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    authService.logout();
    setUser(null);
    setCartItems([]);
    setCartItemCount(0);
    navigate('/');
  }, [navigate]);

  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const handleOrdersClick = useCallback(() => {
    navigate('/orders');
  }, [navigate]);

  return (
    <ProductListingTemplate
      // Data props
      products={products}
      loading={loading}
      error={error}
      totalProducts={totalProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      productsPerPage={12}
      addingToCartId={addingToCartId}
      
      // Filter props
      filters={filters}
      categories={categories}
      brands={brands}
      
      // Event handlers
      onSearch={handleSearch}
      onAddToCart={handleAddToCart}
      onViewProduct={handleViewProduct}
      onUpdateFilters={handleUpdateFilters}
      onClearFilters={handleClearFilters}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onCartClick={handleCartClick}
      onLogoClick={handleLogoClick}
      onLogout={handleLogout}
      onProfileClick={handleProfileClick}
      onOrdersClick={handleOrdersClick}
      
      // User and cart props
      user={user}
      cartItems={cartItems}
      cartItemCount={cartItemCount}
      isCartOpen={isCartOpen}
      onCartClose={handleCartClose}
      onUpdateCartQuantity={handleUpdateCartQuantity}
      onRemoveCartItem={handleRemoveCartItem}
      onCartCheckout={handleCartCheckout} // ✅ Checkout
      checkoutLoading={checkoutLoading}
      checkoutError={checkoutError}
      cartItemLoading={cartItemLoading}
    />
  );
};