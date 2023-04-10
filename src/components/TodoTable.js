import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Popup from './Popup';
import { TiDelete } from 'react-icons/ti';
import Moment from 'moment';
import DeleteButton from './DeleteButton';

function TodoTable({
  tasks,
  setIsComplete,
  updateTasks,
  deleteTask,
  isInvalidInput,
  errors,
  resetErrors,
}) {
  //const todos = [...tasks];

  const handleChange = (id, val) => {
    console.log(id);
    setIsComplete(id, val);
  };

  const removeRow = (id) => {
    deleteTask(id);
  };

  const renderUpdate = (t) => {
    if (!t.isComplete) {
      return (
        <Popup
          isUpdate={true}
          id={t.title}
          udesc={t.desc}
          udeadline={t.deadline}
          upriority={t.priority}
          updateTasks={updateTasks}
          isInvalidInput={isInvalidInput}
          errors={errors}
          resetErrors={resetErrors}
        />
      );
    }
  };

  const renderDate = (d) => {
    let temp = d.format('MM/DD/YYYY');
    console.log(temp);
    return <div>{temp}</div>;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Is Complete</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((t) => (
              <TableRow
                key={t.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{t.title}</TableCell>
                <TableCell align="center">{t.desc}</TableCell>
                <TableCell align="center">
                  {t.deadline.format('MM/DD/YYYY')}
                </TableCell>
                <TableCell align="center">{t.priority}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    onChange={(e) => {
                      let complete = e.target.checked;
                      let id = t.title;
                      handleChange(id, complete);
                    }}
                    checked={t.isComplete}
                  />
                </TableCell>
                <TableCell align="center">
                  {renderUpdate(t)}
                  <DeleteButton deleteTask={deleteTask} id={t.title} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TodoTable;
