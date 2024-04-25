import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import PatientCard from '../components/patients/PatientCard';
import Navbar from '../components/shared/Navbar';
import './Patients.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);

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
        const defaultPatients = [
          {
            id: 1,
            name: 'John Doe',
            age: 35,
            gender: 'Male',
            diagnosedDiseases: ['Flu', 'Hypertension'],
          },
          {
            id: 2,
            name: 'Jane Smith',
            age: 42,
            gender: 'Female',
            diagnosedDiseases: ['Diabetes', 'Asthma'],
          },
          {
            id: 3,
            name: 'Jane Smith',
            age: 42,
            gender: 'Female',
            diagnosedDiseases: ['Diabetes', 'Asthma'],
          },
        ];

        savePatientsToLocalStorage(defaultPatients);
      }

    setPatients(storedPatients);
  }, []);

  const addPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    savePatientsToLocalStorage(updatedPatients);
  };

  return (
    <>
      <Navbar />
        <div className='patients-wrapper'>
          <Container>
            <Button variant="contained" className='patients-add-button'>
              Add Patient
            </Button>
            <Grid container spacing={3}>
              {patients.map((patient, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <PatientCard patient={patient} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
    </>
  );
};

export default Patients;
