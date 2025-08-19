import React from 'react';
import { Button } from '../components/atoms/Button';

const ComingSoon = () => (
  <div
    style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafbfc'
    }}
  >
    <img
      src="/coming-soon.svg"
      alt="Coming Soon"
      style={{ width: 180, marginBottom: 24 }}
      onError={e => (e.target.style.display = 'none')}
    />
    <h1 style={{ fontSize: 32, marginBottom: 12, color: '#222' }}>Coming Soon</h1>
    <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
      This page is under construction.<br />Please check back later!
    </p>
    <Button
      onClick={() => window.location.href = '/'}
    >
      Go to Homepage
    </Button>
  </div>
);

export default ComingSoon;