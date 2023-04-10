import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popup from './Popup';
import { FaBars } from 'react-icons/fa';

function Banner({ tasks, addTask, errors, isInvalidInput, resetErrors }) {
  return (
    <Box sx={({ flexGrow: 1 }, { pb: 7.5 })}>
      <AppBar
        position="fixed"
        sx={
          ({ display: 'flex' }, { justifyContent: 'center' }, { width: '100%' })
        }
      >
        <Toolbar>
          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {' '}
            <FaBars /> FRAMEWORKS
          </Typography>

          <Popup
            isUpdate={false}
            addTask={addTask}
            errors={errors}
            isInvalidInput={isInvalidInput}
            resetErrors={resetErrors}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Banner;
