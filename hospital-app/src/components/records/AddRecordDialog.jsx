import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import './AddRecordDialog.css';

function AddRecordDialog({ open, onClose, onSubmit }) {
  const [date, setDate] = useState('');
  const [examinedPatient, setExaminedPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [examinationNotes, setExaminationNotes] = useState('');

  const handleSubmit = () => {
    if (!date || !examinedPatient || !doctor || !examinationNotes) {
      alert('Please fill out all fields or validate the data');
      return;
    }

    const newRecord = {
      date: date,
      patient: examinedPatient,
      doctor: doctor,
      notes: examinationNotes,
    };

    onSubmit(newRecord);

    setDate('');
    setExaminedPatient('');
    setDoctor('');
    setExaminationNotes('');

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='records-add-dialog'>
        <DialogTitle style={{'marginBottom' : '-2%'}}> Add New Record </DialogTitle>
        <DialogContent>
            <TextField label="Date" value={date} 
                       onChange={(e) => setDate(e.target.value)} 
                       fullWidth
                       className='records-add-dialog-row' />
            <TextField label="ExaminedPatient" value={examinedPatient}
                       onChange={(e) => setExaminedPatient(e.target.value)} 
                       fullWidth
                       className='records-add-dialog-row' />
            <TextField label="ResponsibleDoctor" value={doctor} 
                       onChange={(e) => setDoctor(e.target.value)} 
                       fullWidth
                       className='records-add-dialog-row' />
            <TextField label="Examination notes" value={examinationNotes}
                       onChange={(e) => setExaminationNotes(e.target.value)} 
                       fullWidth
                       className='records-add-dialog-row' />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSubmit} variant="contained" color="primary"
                    className='records-add-dialog-submit'>
              Submit
            </Button>
            <Button onClick={onClose} variant="contained" color="primary"
                    className='records-add-dialog-cancel'>
              Cancel
            </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddRecordDialog;
