import {api, publicApi} from './axiosInstance';
import { apiConfig } from './apiConfig';

export const authService = {
  // User login
  login: async (email, password) => {
    try {
      const response = await publicApi.post(apiConfig.authApi.login, { email, password });
      const { token, user } = response.data;
      
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // User registration
  register: async (userData) => {
    try {
      const response = await publicApi.post(apiConfig.authApi.register, userData);
      const { token, user } = response.data;
      
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // User logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put(apiConfig.authApi.updateProfile, userData);
      const { user } = response.data;
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put(apiConfig.authApi.changePassword, {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post(apiConfig.authApi.forgotPassword, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(apiConfig.authApi.resetPassword, {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post(apiConfig.authApi.verifyEmail, { token });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify email');
    }
  }
};

export default authService;
