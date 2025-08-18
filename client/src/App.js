import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ProductListingPage} from './pages/ProductListingPage';
import './App.css';
import { AuthPage } from './pages/AuthPages';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/sign-up" element={<AuthPage initialView='signup'/>} />
          <Route path="/login" element={<AuthPage initialView='signin' />} />
          <Route path="/forgot-password" element={<AuthPage initialView='forgot' />} />
          <Route path="/reset-password" element={<AuthPage initialView='reset' />} />
          
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
