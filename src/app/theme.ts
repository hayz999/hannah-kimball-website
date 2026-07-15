import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Memphis Playground palette. Purple/ink carry over from the previous theme
// so nav and text don't feel unrelated to the site's history; blue is fully
// retired in favor of turquoise, pink, and mustard accents.
const theme = createTheme({
  palette: {
    primary: {
      main: '#00C2C7',
      light: '#7FEFF1',
      dark: '#00888C',
      contrastText: '#1A1A2E',
    },
    secondary: {
      main: '#5B2D8E',
      light: '#8B5CF6',
      dark: '#3D1A6E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFDF7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4561',
    },
    divider: 'rgba(26,26,46,0.15)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 700, letterSpacing: '0.04em' },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '18px 6px 18px 6px',
          border: '2px solid #1A1A2E',
          boxShadow: '4px 4px 0 #1A1A2E',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          '&:hover': {
            boxShadow: '6px 6px 0 #1A1A2E',
            transform: 'translate(-2px,-2px)',
          },
          '&:active': {
            boxShadow: '1px 1px 0 #1A1A2E',
            transform: 'translate(3px,3px)',
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: '#00888C',
          },
          '&.Mui-disabled': {
            boxShadow: 'none',
            border: '2px solid rgba(26,26,46,0.25)',
          },
        },
        text: {
          border: 'none',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none', transform: 'none' },
          '&:active': { boxShadow: 'none', transform: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s cubic-bezier(0.22,1,0.36,1)',
          '&.MuiPaper-elevation1': {
            border: '2.5px solid #1A1A2E',
            borderRadius: '8px 24px 8px 24px',
            boxShadow: '6px 6px 0 #1A1A2E',
          },
          '&.MuiPaper-elevation1:hover': {
            transform: 'translate(-3px,-3px)',
            boxShadow: '9px 9px 0 #1A1A2E',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          border: '1.5px solid #1A1A2E',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFDF7',
          color: '#1A1A2E',
          borderBottom: '3px solid #1A1A2E',
          boxShadow: 'none',
        },
      },
    },
  },
});

// Scales headline variants down at narrow widths so long titles (e.g.
// "Conducting History", "Compositions") don't overflow on mobile.
export default responsiveFontSizes(theme);
