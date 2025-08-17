import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductListingTemplate from '../components/templates/ProductListingTemplate';
import productService from '../services/productService';
import cartService from '../services/cartService';
import authService from '../services/authService';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for products and data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // State for filters and pagination
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
  
  // State for available filter options
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // State for cart
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // State for user
  const [user, setUser] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Load categories and brands
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

  // Load products based on filters, search, and pagination
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: 12,
        ...filters
      };

      // Remove empty filter values
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      let response;
      if (searchTerm) {
        response = await productService.searchProducts(searchTerm, params);
      } else {
        response = await productService.getProducts(params);
      }

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

  // Load products when dependencies change
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Update URL search params when filters or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setSearchParams(params);
  }, [searchTerm, currentPage, filters, setSearchParams]);

  // Load cart data
  const loadCart = useCallback(async () => {
    if (!user) return;

    try {
      const cartData = await cartService.getCart();
      setCartItems(cartData.items || []);
      setCartItemCount(cartData.itemCount || 0);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, [user]);

  // Load cart when user changes
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Event handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleUpdateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'newest'
    });
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

    try {
      await cartService.addToCart(product._id, 1);
      await loadCart(); // Reload cart data
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // You might want to show a toast notification here
    }
  }, [user, navigate, loadCart]);

  const handleViewProduct = useCallback((product) => {
    navigate(`/products/${product._id}`);
  }, [navigate]);

  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleUpdateCartQuantity = useCallback(async (itemId, quantity) => {
    try {
      await cartService.updateCartItem(itemId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  }, [loadCart]);

  const handleRemoveCartItem = useCallback(async (itemId) => {
    try {
      await cartService.removeFromCart(itemId);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  }, [loadCart]);

  const handleCartCheckout = useCallback(() => {
    setIsCartOpen(false);
    navigate('/checkout');
  }, [navigate]);

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
      onCartCheckout={handleCartCheckout}
    />
  );
};

export default ProductListingPage;
