import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FaPlusCircle } from 'react-icons/fa';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TiCancel } from 'react-icons/ti';
import { FaEdit } from 'react-icons/fa';
import PopupBanner from './PopupBanner';
import Moment from 'moment';
import FormHelperText from '@mui/material/FormHelperText';

function Popup({
  isUpdate,
  addTask,
  updateTasks,
  id,
  udesc,
  udeadline,
  upriority,
  errors,
  isInvalidInput,
  resetErrors,
}) {
  // States
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(isUpdate ? id : '');
  const [desc, setDesc] = useState(isUpdate ? udesc : '');
  const [deadline, setDeadline] = useState(isUpdate ? udeadline : '');
  const [priority, setPriority] = useState(isUpdate ? upriority : '');
  const [updateErr, setUpdateErr] = useState({descErr: false, ddErr: false});
  const [submitted, setSubmitted] = useState({ is: false, text: '' });

  const setDefault = (val) => {
    if (isUpdate) {
      useState(val);
    } else {
      useState('');
    }
  };

  const openForm = () => {
    if (isUpdate) {
      setTitle(id);
      setDesc(udesc);
      setDeadline(udeadline);
      setPriority(upriority);
    }
    setOpen(true);
  };

  const closeForm = () => {
    if (!isUpdate) {
      setTitle('');
      setDesc('');
      setDeadline(null);
      setPriority('');
    }
    setSubmitted({ is: false, text: '' });
    resetErrors();
    setUpdateErr({descErr: false, ddErr: false});
    setOpen(false);
  };

  const createTask = () => {
    // Add validation
    const task = { title, desc, deadline, priority, isComplete: false };

    if (!isInvalidInput(task)) {
      // const task = { title, desc, deadline, priority, isComplete: false };
      //console.log(task);
      addTask(task);
      closeForm();
    }
  };

  const update = () => {
    // Add Validation
    setSubmitted(true);
    
    const task = { title, desc, deadline, priority, isComplete: false };
    console.log(deadline);
    isInvalidInput(task);
    console.log(title);
    if (desc && deadline) {
      setUpdateErr({descErr: false, ddErr: false});
      updateTasks(title, task);
      closeForm();
    } else {
      setUpdateErr({descErr: !desc, ddErr: !deadline});
    }
  };

  const dealwithdeadline = (d) => {
    //let temp = d.format('MM/DD/YYYY');
    // console.log(temp);
    setDeadline(d);
  };

  // Conditionally renders button based on updating or not
  const renderInnerButton = () => {
    if (isUpdate) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaEdit />}
          onClick={update}
        >
          Edit
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlusCircle />}
          onClick={createTask}
        >
          Add
        </Button>
      );
    }
  };

  const renderTitleField = () => {
    if (!isUpdate) {
      return (
        <TextField
          error={errors.tError}
          helperText={errors.tError ? errors.TEText : ''}
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="tasktitle"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      );
    }
  };

  const renderOuterButton = () => {
    if (isUpdate) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaEdit />}
          onClick={openForm}
        >
          Update
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlusCircle />}
          onClick={openForm}
        >
          Add
        </Button>
      );
    }
  };

  return (
    <div>
      {renderOuterButton()}
      <Dialog open={open} onClose={closeForm}>
        <PopupBanner isUpdate={isUpdate} />
        <DialogContent>
          <form>
            {renderTitleField()}
            <TextField
              error={errors.dsError || updateErr.descErr}
              helperText={
                errors.dsError || updateErr.descErr ? 'Description is required' : ''
              }
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="taskdesc"
              fullWidth
              variant="outlined"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={deadline}
                  diablePast={true}
                  label="Deadline"
                  //inputFormat="MM/DD/YYYY"
                  onChange={(e) => {
                    dealwithdeadline(e);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errors?.dlError || updateErr.ddErr ? 'Deadline is required' : '',
                      error: errors?.dlError || updateErr.ddErr,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl error={errors?.pError}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Priority
              </FormLabel>
              <RadioGroup
                row
                helperText="test"
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel value="med" control={<Radio />} label="Med" />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
              <FormHelperText>
                {errors?.pError ? 'Priority is required' : ''}
              </FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          {renderInnerButton()}
          <Button
            variant="contained"
            color="error"
            startIcon={<TiCancel />}
            onClick={closeForm}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup;
