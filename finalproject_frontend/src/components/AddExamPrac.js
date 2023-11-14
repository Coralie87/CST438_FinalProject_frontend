import React, { useState } from 'react';

import {SERVER_URL} from '../constants'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCourse is required, function called when Add clicked.
function AddExamPrac(props) { 

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ExamPrac, setExamPrac] = useState({ ExamPracName:'', dueDate:'', courseId: '' });
  
  const handleOpen = () => {
    setMessage('');
    setExamPrac({ ExamPracName:'', dueDate:'', courseId: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChange = (event) => {
    setExamPrac({...ExamPrac, [event.target.name]:event.target.value });
  }

  const AddExamPrac = ( ) => {
    fetch(`${SERVER_URL}/ExamPrac`, 
      {  
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(ExamPrac)
      } 
    )
    .then((response) => { 
      if (response.ok) {
          setMessage('ExamPrac added.');
      } else {
          setMessage("Add failed.");
      }
   } )
  .catch((err) =>  { setMessage('Error. '+err) } );

  }

  return (
      <div>

        <button type="button" margin="auto" onClick={handleOpen}>Add ExamPrac</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New ExamPrac</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <h4>{message}</h4>
              <TextField autoFocus fullWidth label="Name" name="ExamPracName" onChange={handleChange}  /> 
              <TextField fullWidth label="Due Date" name="dueDate" helperText="yyyy-mm-dd" onChange={handleChange}  /> 
              <TextField fullWidth label="Course ID" name="courseId" onChange={handleChange}  />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Close</Button>
              <Button id="add" color="primary" onClick={addExamPrac}>Add</Button>

            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddExamPrac.propTypes = {
  addExamPrac : PropTypes.func.isRequired
}

export default AddExamPrac;