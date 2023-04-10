import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FaEdit } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

function PopupBanner({ isUpdate }) {
  const renderBanner = () => {
    if (isUpdate) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <FaEdit />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                &nbsp;Edit Task
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
    } else {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <FaEdit />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                &nbsp;Add Task
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  };

  return renderBanner();
}

export default PopupBanner;
