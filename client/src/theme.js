import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

// Create Emotion cache configured for RTL
export const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

// Create Material-UI theme tailored for EasyLearn
export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#4f46e5',
      light: '#eef2ff',
      dark: '#4338ca',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0ea5e9',
      light: '#f0f9ff',
      dark: '#0284c7',
      contrastText: '#ffffff'
    },
    success: {
      main: '#10b981',
      light: '#ecfdf5',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      dark: '#d97706',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b'
    }
  },
  typography: {
    fontFamily: ['Heebo', 'Roboto', 'sans-serif'].join(','),
    h1: { fontWeight: 900 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -4px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.03)'
          }
        }
      }
    }
  }
});
