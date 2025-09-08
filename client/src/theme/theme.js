import colors from './colors.json';
import breakpoints from './breakpoints.json';
import typography from './typography.json';
import globals from './globals.json';

/**
 * Flatten nested JSON into CSS vars
 * Example: { palette: { primary: "#fff" } } -> { "--palette-primary": "#fff" }
 */
const flattenToCssVars = (obj, prefix = '') => {
  const out = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flattenToCssVars(value, newKey));
    } else {
      out[`--${newKey}`] = String(value);
    }
  }
  return out;
};

/**
 * Apply theme (light/dark) + globals + breakpoints + typography
 */
export const applyTheme = (themeName = 'light') => {
  const themeObj = colors[themeName]; // pick light or dark palette
  const root = document.documentElement;

  // Flatten JSONs into CSS vars
  const cssMap = {
    ...flattenToCssVars(themeObj, 'color'),
    ...flattenToCssVars(breakpoints, 'bp'),
    ...flattenToCssVars(typography, 'font'),
    ...flattenToCssVars(globals, 'global')
  };

  // Apply CSS vars to :root
  Object.entries(cssMap).forEach(([k, v]) => {
    root.style.setProperty(k, v);
  });

  // Also map some handy semantic vars
  root.style.setProperty('--color-primary', themeObj.palette.primary);
  root.style.setProperty('--color-background', themeObj.palette.background);
  root.style.setProperty('--color-text', themeObj.palette.text);
};

/**
 * Get theme vars (useful in JS/React code)
 */
export const getThemeVars = (themeName = 'light') => {
  const themeObj = colors[themeName];
  return {
    ...flattenToCssVars(themeObj, 'color'),
    ...flattenToCssVars(breakpoints, 'bp'),
    ...flattenToCssVars(typography, 'font'),
    ...flattenToCssVars(globals, 'global')
  };
};