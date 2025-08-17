export const apiConfig = {
  // Product API routes
  productApi: {
    getProducts: '/products',
    getProduct: (id) => `/products/${id}`,
    getCategories: '/products/categories',
    getBrands: '/products/brands',
    searchProducts: '/products/search',
    getProductReviews: (id) => `/products/${id}/reviews`,
    createProductReview: (id) => `/products/${id}/reviews`,
    getFeaturedProducts: '/products/featured',
    getRelatedProducts: (id) => `/products/${id}/related`,
  },

  // Cart API routes
  cartApi: {
    getCart: '/cart',
    addToCart: '/cart/items',
    updateCartItem: (id) => `/cart/items/${id}`,
    removeFromCart: (id) => `/cart/items/${id}`,
    clearCart: '/cart',
    getCartSummary: '/cart/summary',
  },

  // Auth API routes
  authApi: {
    login: '/auth/login',
    register: '/auth/register',
    updateProfile: '/auth/profile',
    changePassword: '/auth/password',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },

  // User API routes
  userApi: {
    getProfile: '/users/profile',
    updateProfile: '/users/profile',
    getOrders: '/users/orders',
    getOrder: (id) => `/users/orders/${id}`,
  },

  // Order API routes
  orderApi: {
    createOrder: '/orders',
    getOrders: '/orders',
    getOrder: (id) => `/orders/${id}`,
    updateOrder: (id) => `/orders/${id}`,
    cancelOrder: (id) => `/orders/${id}/cancel`,
  },
};