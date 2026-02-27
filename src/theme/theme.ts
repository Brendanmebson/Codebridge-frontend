import { createTheme } from '@mui/material/styles';

// Inject Poppins from Google Fonts
const fontLink = document.createElement('link');
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400;1,600&display=swap';
fontLink.rel = 'stylesheet';
if (!document.head.querySelector('[href*="Poppins"]')) {
  document.head.appendChild(fontLink);
}

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },

    success: {
      main: '#43A047',
      light: '#66BB6A',
      dark: '#2E7D32',
    },

    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },

    warning: {
      main: '#F9A825',
      light: '#FBC02D',
      dark: '#F57F17',
    },

    info: {
      main: '#26A69A',
      light: '#4DB6AC',
      dark: '#00796B',
    },

    background: {
      default: '#F1F8E9',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#0D1F0E',
      secondary: '#4F6B52',
    },
  },

  typography: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',

    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },

    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '2.8rem',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },

    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '2.2rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },

    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1.6rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },

    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },

    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.85,
    },

    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.75,
    },

    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.8,
    },

    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '0.85rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.08em',
    },

    caption: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },

    overline: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
    },

    button: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'none' as const,
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: '10px 28px',
          fontSize: '0.92rem',
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          '&:hover': {
            boxShadow: '0px 12px 32px rgba(46, 125, 50, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '0.95rem',
          borderRadius: 16,
        },
        sizeSmall: {
          padding: '6px 18px',
          fontSize: '0.82rem',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 16px 40px rgba(46, 125, 50, 0.3)',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
          '&:hover': {
            boxShadow: '0px 20px 48px rgba(46, 125, 50, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            fontFamily: '"Poppins", sans-serif',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 500,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});