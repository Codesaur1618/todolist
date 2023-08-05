import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useEffect } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data } = useTodoLists();
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: 0.25,
        minWidth: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.25,
          minWidth: 200,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                {Icon ? (
                  <Icon color="primary" /> // Use "color" prop to adapt icon color to the theme
                ) : (
                  <Icons.List color="primary" /> // Use "color" prop to adapt icon color to the theme
                )}
                <ListItemText
                  sx={{ ml: 0.5, color: 'text.primary' }} // Use "color" prop to adapt text color to the theme
                  primary={name}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
