import { Add } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

import { NewListDialog } from './NewListDialog.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

export function AppHeader({ isDarkMode, handleThemeToggle }) {
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Lists
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="toggle dark mode"
            onClick={handleThemeToggle}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add new list"
            onClick={dialogState.open}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
