import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {api} from '../services/axiosInstance';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Create PaymentIntent on the server
      const res = await api.post('/payment/create-payment-intent', { amount });
      const clientSecret = res.data.clientSecret;

      // 2. Confirm card payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: 20 }}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
    </form>
  );
};

const CheckoutPage = () => {
  // Example: $10.00 = 1000 cents
  const amount = 1000;

  return (
    <Elements stripe={stripePromise}>
      <h2 style={{ textAlign: 'center' }}>Checkout</h2>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default CheckoutPage;