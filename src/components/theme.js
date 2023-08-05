import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3', // Your light mode primary color
    },
    secondary: {
      main: '#f50057', // Your light mode secondary color
    },
    // Add more color definitions or override existing ones as needed
  },
  // Add more theme configurations as needed
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7', // Your dark mode primary color
    },
    secondary: {
      main: '#ff4081', // Your dark mode secondary color
    },
    // Add more color definitions or override existing ones as needed
  },
  // Add more theme configurations as needed
});

export { lightTheme, darkTheme };
