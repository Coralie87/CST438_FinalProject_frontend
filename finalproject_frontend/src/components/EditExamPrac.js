import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants';

function EditExamPrac(props) {
  const [editedData, setEditedData] = useState({}); // State for edited assignment data

  const handleEditDataChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ExamPrac, setExamPrac] = useState(props.ExamPrac)
  
  const handleOpen = () => {
    setMessage('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChange = (event) => {
    setExamPrac({...ExamPrac, [event.target.name]:event.target.value });
  }

  const saveExamPrac = () => {
    fetch(`${SERVER_URL}/ExamPrac/${ExamPrac.id}`, 
    {  
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(ExamPrac)
    } 
  )
  .then((response) => { 
    if (response.ok) {
        setMessage('ExamPrac saved.');
    } else {
        setMessage("Save failed. " + response.status);
    }
 } )
.catch((err) =>  { setMessage('Error. '+err) } );
  }

  return (
      <div>
        <button type="button" margin="auto" onClick={handleOpen}>Edit</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit ExamPrac</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <h4>{message}</h4>
              <TextField fullWidth label="Id" name="id" value={ExamPrac.id} InputProps={{readOnly: true, }}/>
              <TextField autoFocus fullWidth label="Name" name="ExamPracName" value={ExamPracExamPracName} onChange={handleChange}  /> 
              <TextField fullWidth label="Due Date" name="dueDate" value={ExamPrac.dueDate} onChange={handleChange}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Close</Button>
              <Button color="primary" onClick={saveExamPrac}>Save</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 

}