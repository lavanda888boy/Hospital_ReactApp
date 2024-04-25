import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import PatientCard from '../components/patients/PatientCard';
import AddPatientDialog from '../components/patients/AddPatientDialog';
import Navbar from '../components/shared/Navbar';
import './Patients.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const savePatientsToLocalStorage = (patientsData) => {
    localStorage.setItem('patients', JSON.stringify(patientsData));
  };

  const getPatientsFromLocalStorage = () => {
    const patientsData = localStorage.getItem('patients');
    return patientsData ? JSON.parse(patientsData) : [];
  };

  useEffect(() => {
    const storedPatients = getPatientsFromLocalStorage();
    
    if (storedPatients.length === 0) {
      const defaultPatients = [];
      savePatientsToLocalStorage(defaultPatients);
    }

    setPatients(storedPatients);
  }, []);

  function handleAddPatient(newPatient) {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    savePatientsToLocalStorage(updatedPatients);
    setOpenDialog(false);
  };

  function handleDeletePatient(deletePatient) {
    const updatedPatients = patients.filter(patient => patient.name!== deletePatient.name ||
      patient.age!== deletePatient.age || patient.gender!== deletePatient.gender);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return (
    <>
      <Navbar />
        <div className='patients-wrapper'>
          <Container>
            <Button variant="contained" onClick={() => setOpenDialog(true)} className='patients-add-button'>
              Add Patient
            </Button>
            <Grid container spacing={3}>
              {patients.map((patient, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <PatientCard patient={patient} onDelete={handleDeletePatient} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
        <AddPatientDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleAddPatient}
        />
    </>
  );
};

export default Patients;
