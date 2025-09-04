import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '../services/axiosInstance';

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,'publishable key');

// Load Stripe outside of component render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {

      console.log('handleCheckout try block');
      // ✅ Always resolve stripePromise inside the function
      const stripe = await stripePromise;

      if (!stripe) {
        setError('Stripe.js failed to load');
        setLoading(false);
        return;
      }

      // Dummy items for testing
      const res = await api.post('/payment/create-checkout-session', {
        items: [
          { name: 'Test Product 1', price: 1000, quantity: 1 }, // $10
          { name: 'Test Product 2', price: 2000, quantity: 2 }  // $20 x 2
        ]
      });

      console.log(res,'res');

      const { id: sessionId } = res.data;

      console.log(sessionId,'sessionId');

      // ✅ Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Checkout</h2>
      <button 
        onClick={handleCheckout} 
        disabled={loading} 
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: 20 }}
      >
        {loading ? 'Redirecting...' : 'Pay Now'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 20 }}>{error}</div>}
    </div>
  );
};

export default CheckoutPage;