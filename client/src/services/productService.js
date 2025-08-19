import { apiConfig } from './apiConfig';
import { api } from './axiosInstance';

export const productService = {
  // Get all products with filters and pagination
  getProducts: async (params = {}) => {
    try {
      const response = await api.get(apiConfig.productApi.getProducts, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  // Get single product by ID
  getProduct: async (productId) => {
    try {
      const response = await api.get(apiConfig.productApi.getProduct(productId));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },

  // Get product categories
  getCategories: async () => {
    try {
      const response = await api.get(apiConfig.productApi.getCategories);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Get product brands
  getBrands: async () => {
    try {
      const response = await api.get(apiConfig.productApi.getBrands);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch brands');
    }
  },

  // Search products
  searchProducts: async (searchTerm, params = {}) => {
    try {
      const response = await api.get(apiConfig.productApi.searchProducts, {
        params: { q: searchTerm, ...params }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  },

  // Get product reviews
  getProductReviews: async (productId, params = {}) => {
    try {
      const response = await api.get(apiConfig.productApi.getProductReviews(productId), { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },

  // Create product review (requires authentication)
  createProductReview: async (productId, reviewData) => {
    try {
      const response = await api.post(apiConfig.productApi.createProductReview(productId), reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create review');
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    try {
      const response = await api.get(apiConfig.productApi.getFeaturedProducts, { params: { limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      const response = await api.get(apiConfig.productApi.getRelatedProducts(productId), { params: { limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch related products');
    }
  }
};

export default productService;
