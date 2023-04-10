import React from 'react';
import { TiDelete } from 'react-icons/ti';
import Button from '@mui/material/Button';

function DeleteButton({ tasks, deleteTask, id }) {
  const removeTask = () => {
    console.log('Deleted');
    deleteTask(id);
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<TiDelete />}
      onClick={removeTask}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
