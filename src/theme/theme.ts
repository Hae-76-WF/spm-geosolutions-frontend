import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#034732', // Deep Brand Green
      light: '#2F765E',
      dark: '#022E20',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#276EB9', // Accent Blue
      light: '#5B95D0',
      dark: '#1C4E85',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFFDF2',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#53616D',
    },
    info: {
      main: '#276EB9',
      light: '#E6F0FA',
    },
    success: {
      main: '#034732',
      light: '#E2F0EA',
    },
    warning: {
      main: '#E88821', // CTA / Warning
      light: '#F8F5B5', // Brand Cream
    },
    error: {
      main: '#B42318',
      light: '#FDE7E5',
    },
    divider: '#D9E3EA',
  },
  typography: {
    fontFamily: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: '#034732',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: '#034732',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      color: '#276EB9',
    },
    h4: {
      fontWeight: 700,
      color: '#034732',
    },
    h5: {
      fontWeight: 700,
      color: '#276EB9',
    },
    h6: {
      fontWeight: 700,
      color: '#034732',
    },
    subtitle1: {
      fontWeight: 600,
      color: '#212529',
    },
    subtitle2: {
      fontWeight: 600,
      color: '#53616D',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
      color: '#34414B',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#53616D',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(3, 71, 50, 0.18)',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #D9E3EA',
          boxShadow: '0 1px 3px rgba(3, 71, 50, 0.06), 0 1px 2px rgba(39, 110, 185, 0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#034732',
          borderBottom: '1px solid #D9E3EA',
          boxShadow: '0 1px 4px rgba(3, 71, 50, 0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '0.95rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
  },
});
