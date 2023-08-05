import { Box, CssBaseline, Switch } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use lightTheme as the default theme
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppState>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppHeader />
          <Switch checked={isDarkMode} onChange={handleThemeToggle} />
          <AllTodoLists />
          <CurrentTodoList />
        </Box>
      </AppState>
    </ThemeProvider>
  );
}
