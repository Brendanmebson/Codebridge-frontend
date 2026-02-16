import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2E7D32',     // Base green
      light: '#4CAF50',    // Lighter green
      dark: '#1B5E20',     // Deep forest green
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#66BB6A',     // Supporting soft green
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
      default: '#F1F8E9',  // Soft green tint background
      paper: '#FFFFFF',
    },

    text: {
      primary: '#1B1B1B',
      secondary: '#4F4F4F',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },

    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },

    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },

    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },

    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },

    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease',

          '&:hover': {
            boxShadow: '0px 6px 16px rgba(46, 125, 50, 0.25)',
            transform: 'translateY(-1px)',
          },
        },

        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1.125rem',
        },

        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease',

          '&:hover': {
            boxShadow: '0px 8px 20px rgba(46, 125, 50, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
});