import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductListingPage } from './pages/ProductListingPage';
import './App.css';
import { AuthPage } from './pages/AuthPages';
import ComingSoon from './pages/ComingSoon';
import CheckoutPage from './pages/CheckoutPage';
import { OrderPlacedFailed, OrderPlacedSuccessfully } from './pages/OrderPlacedPages';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth pages (no layout) */}
          <Route path="/sign-up" element={<AuthPage initialView="signup" />} />
          <Route path="/login" element={<AuthPage initialView="signin" />} />
          <Route path="/forgot-password" element={<AuthPage initialView="forgot" />} />
          <Route path="/reset-password" element={<AuthPage initialView="reset" />} />

            <Route path="/" element={<ProductListingPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            {/* <Route path="/checkout" element={<ComingSoon />} /> */}
            <Route path="/profile" element={<ComingSoon />} />
            <Route path="/orders" element={<ComingSoon />} />
            <Route path="/products/:id" element={<ComingSoon />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<OrderPlacedSuccessfully/>} />
            <Route path="/cancel" element={<OrderPlacedFailed />} />
            {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
