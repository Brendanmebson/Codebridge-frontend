import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0', // Trust-building blue
      light: '#1976D2',
      dark: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2E7D32', // Growth green
      light: '#388E3C',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
    },
    info: {main: '#0288D1',
light: '#03A9F4',
dark: '#01579B',
},
background: {
default: '#F5F7FA',
paper: '#FFFFFF',
},
text: {
primary: '#1A1A1A',
secondary: '#666666',
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
borderRadius: 8,
},
components: {
MuiButton: {
styleOverrides: {
root: {
borderRadius: 8,
padding: '10px 24px',
fontSize: '1rem',
boxShadow: 'none',
'&:hover': {
boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
borderRadius: 12,
boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
'&:hover': {
boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
},
},
},
},
MuiTextField: {
styleOverrides: {
root: {
'& .MuiOutlinedInput-root': {
borderRadius: 8,
},
},
},
},
},
});