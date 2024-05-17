import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Button } from "@mui/material";
import PatientCard from "../components/patients/PatientCard";
import AddPatientDialog from "../components/patients/AddPatientDialog";
import "./Patients.css";

import { AppStateContext } from "../AppStateContext";

const Patients = () => {
  const { patientCount, setPatientCount, patients, setPatients, userRole } =
    useContext(AppStateContext);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);
  }, [setPatients]);

  function savePatientsToLocalStorage(patientsData) {
    localStorage.setItem("patients", JSON.stringify(patientsData));
  }

  function getPatientCountFromLocalStorage() {
    const count = localStorage.getItem("patientCount");
    return count ? parseInt(count, 10) : 0;
  }

  function handleAddPatient(newPatient) {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    savePatientsToLocalStorage(updatedPatients);

    const patientCount = getPatientCountFromLocalStorage() + 1;
    localStorage.setItem("patientCount", patientCount.toString());

    setPatientCount(patientCount);

    setOpenDialog(false);
  }

  function handleDeletePatient(deletePatient) {
    const updatedPatients = patients.filter(
      (patient) =>
        patient.name !== deletePatient.name ||
        patient.age !== deletePatient.age ||
        patient.gender !== deletePatient.gender
    );
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    const patientCount = getPatientCountFromLocalStorage() - 1;
    localStorage.setItem("patientCount", patientCount.toString());

    setPatientCount(patientCount);
  }

  return (
    <>
      <div className="patients-wrapper">
        <Container>
          {(userRole === "Admin" || userRole === "Doctor") && (
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              className="patients-add-button"
            >
              Add Patient
            </Button>
          )}
          <Grid container spacing={3}>
            {patients &&
              patients.map((patient, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <PatientCard
                    patient={patient}
                    onDelete={handleDeletePatient}
                  />
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
