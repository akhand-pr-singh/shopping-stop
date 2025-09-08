import React, { createContext, useContext, useEffect, useState } from 'react';
import breakpoints from '../theme/breakpoints.json';

// Convert breakpoint values (strings like "640px") into numbers
const parsePx = (val) => parseInt(val.replace('px', ''), 10);

const sm = parsePx(breakpoints.sm);   // 640
const md = parsePx(breakpoints.md);   // 768

const ResponsiveContext = createContext(null);

export const ResponsiveProvider = ({ children }) => {
  const [state, setState] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < sm,
    isTablet: window.innerWidth >= sm && window.innerWidth <= md,
    isDesktop: window.innerWidth > md
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setState({
        width,
        isMobile: width < sm,
        isTablet: width >= sm && width <= md,
        isDesktop: width > md
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={state}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) {
    throw new Error('useResponsive must be used inside ResponsiveProvider');
  }
  return ctx;
};
