import {api} from './axiosInstance';
import { apiConfig } from './apiConfig';

export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      const response = await api.get(apiConfig.cartApi.getCart);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post(apiConfig.cartApi.addToCart, { productId, quantity });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(apiConfig.cartApi.updateCartItem(itemId), { quantity });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(apiConfig.cartApi.removeFromCart(itemId));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await api.delete(apiConfig.cartApi.clearCart);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  },

  // Get cart summary (count, total, etc.)
  getCartSummary: async () => {
    try {
      const response = await api.get(apiConfig.cartApi.getCartSummary);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart summary');
    }
  }
};

export default cartService;
