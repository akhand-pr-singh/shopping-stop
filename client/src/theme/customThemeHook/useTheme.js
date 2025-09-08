import { useCallback, useEffect, useState } from 'react';
import { applyTheme, getThemeVars } from '../theme';

export const useTheme = (defaultTheme = 'light') => {
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, setTheme: setThemeState, toggle, vars: getThemeVars(theme) };
};
