import { DeleteOutlineRounded, Send } from '@mui/icons-material';
import * as Icons from '@mui/icons-material';
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoList } from '../hooks/useTodoList.js';
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function CurrentTodoList() {
  const { currentList } = useAppState();
  const { data, newItem, deleteItem, toggleChecked, updateItem } =
    useTodoList(currentList);
  const { updateList } = useTodoLists();
  const [newItemText, setNewItemText] = useState('');
  const [originalListName, setOriginalListName] = useState('');
  const [originalListItems, setOriginalListItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data?.name) {
      setOriginalListName(data.name);
    }
  }, [currentList, data?.name]);

  useEffect(() => {
    if (data?.items) {
      setOriginalListItems(
        data.items.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})
      );
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API call to fetch data
    setTimeout(() => {
      setIsLoading(false);
      // Handle potential errors from API
      // setError('Error fetching data. Please try again later.');
    }, 1000);
  }, [currentList]);

  const Icon = Icons[data?.icon];

  const handleListNameChange = (event) => {
    setOriginalListName(event.target.value);
  };

  const handleListNameBlur = () => {
    if (originalListName !== data.name) {
      updateList(data.id, originalListName);
    }
  };

  const handleItemNameChange = (id, value) => {
    setOriginalListItems({
      ...originalListItems,
      [id]: value,
    });
  };

  const handleItemNameBlur = (id) => {
    const updatedName = originalListItems[id];
    if (updatedName !== data.items.find((item) => item.id === id).name) {
      updateItem(id, updatedName);
    }
  };

  const handleAddNewItem = (event) => {
    event.preventDefault();
    if (newItemText.trim() !== '') {
      newItem(newItemText);
      setNewItemText('');
    }
  };

  const handleDeleteItem = (id) => {
    // Add confirmation dialog here if needed
    deleteItem(id);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box sx={{ flex: 1 }}>
        {isLoading ? (
          <CircularProgress />
        ) : data ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  p: 1,
                  mr: 1,
                  borderRadius: '50%',
                  display: 'flex',
                }}
              >
                {Icon ? (
                  <Icon fontSize="large" color="black" /> 
                ) : (
                  <Icons.List fontSize="large" color="black" /> 
                )}
              </Box>
              <TextField
                value={originalListName}
                onChange={handleListNameChange}
                onBlur={handleListNameBlur}
                color="primary" // Use "color" prop to adapt text color to the theme
              />
            </Box>
            <Divider />
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                mx: 'auto',
                mt: 2,
              }}
            >
              {data.items.length > 0 ? (
                data.items.map(({ id, checked }) => {
                  const labelId = `checkbox-list-label-${id}`;

                  return (
                    <ListItem
                      key={id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteItem(id)}
                        >
                          <DeleteOutlineRounded color="primary" /> {/* Use "color" prop to adapt icon color to the theme */}
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={() => toggleChecked(id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked ?? false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId}>
                          <TextField
                            onClick={(e) => e.stopPropagation()}
                            onChange={(event) =>
                              handleItemNameChange(id, event.target.value)
                            }
                            onBlur={() => handleItemNameBlur(id)}
                            value={originalListItems[id] ?? ''}
                            size="small"
                            variant="standard"
                          />
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <Typography>No items in the list.</Typography>
              )}
              <ListItem>
                <Box
                  component="form"
                  sx={{ width: 1 }}
                  onSubmit={handleAddNewItem}
                >
                  <TextField
                    onChange={(event) => setNewItemText(event.target.value)}
                    value={newItemText}
                    margin="normal"
                    id="new-item"
                    label="New Item"
                    type="text"
                    fullWidth
                    variant="filled"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="submit"
                            onClick={() => {
                              document.activeElement.blur();
                            }}
                            edge="end"
                          >
                            <Send color="primary" /> {/* Use "color" prop to adapt icon color to the theme */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </ListItem>
            </List>
          </>
        ) : (
          <Typography>No List Selected</Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
}
