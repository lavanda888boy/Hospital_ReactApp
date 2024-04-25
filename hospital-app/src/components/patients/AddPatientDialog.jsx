import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import './AddPatientDialog.css';

function AddPatientDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosedDiseases, setDiagnosedDiseases] = useState('');

  const handleSubmit = () => {
    if (!name || !age || age < 1 || !gender || !diagnosedDiseases) {
      alert('Please fill out all fields or validate the data');
      return;
    }

    const newPatient = {
      name,
      age: parseInt(age),
      gender,
      diagnosedDiseases: diagnosedDiseases.split(',').map(disease => disease.trim()),
    };

    onSubmit(newPatient);

    setName('');
    setAge('');
    setGender('');
    setDiagnosedDiseases('');

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='patients-add-dialog'>
        <DialogTitle style={{'marginBottom' : '-2%'}}> Add New Patient </DialogTitle>
        <DialogContent>
            <TextField label="Name" value={name} 
                       onChange={(e) => setName(e.target.value)} 
                       fullWidth
                       className='patients-add-dialog-row' />
            <TextField label="Age" type="number" value={age}
                       onChange={(e) => setAge(e.target.value)} 
                       fullWidth
                       className='patients-add-dialog-row' />
            <TextField label="Gender" value={gender} 
                       onChange={(e) => setGender(e.target.value)} 
                       fullWidth
                       className='patients-add-dialog-row' />
            <TextField label="Diagnosed Diseases (comma-separated)" value={diagnosedDiseases}
                       onChange={(e) => setDiagnosedDiseases(e.target.value)} 
                       fullWidth
                       className='patients-add-dialog-row' />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSubmit} variant="contained" color="primary"
                    className='patients-add-dialog-submit'>
                Submit
            </Button>
            <Button onClick={onClose} variant="contained" color="primary"
                    className='patients-add-dialog-cancel'>
                Cancel
            </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddPatientDialog;
