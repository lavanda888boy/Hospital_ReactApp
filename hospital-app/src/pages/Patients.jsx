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
    async function fetchPatients() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://localhost:7134/api/Patient", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    }

    fetchPatients();
  }, [setPatients]);

  function getPatientCountFromLocalStorage() {
    const count = localStorage.getItem("patientCount");
    return count ? parseInt(count, 10) : 0;
  }

  async function handleAddPatient(newPatient) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://localhost:7134/api/Patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPatient),
      });
      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const patientCount = getPatientCountFromLocalStorage() + 1;
      localStorage.setItem("patientCount", patientCount.toString());
      setPatientCount(patientCount);

      window.location.reload();
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  }

  function handleUpdatePatient(updatePatient) {}

  async function handleDeletePatient(deletePatientId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://localhost:7134/api/Patient?id=${deletePatientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      let patientCount = getPatientCountFromLocalStorage() - 1;
      patientCount = patientCount >= 0 ? patientCount : 0;
      localStorage.setItem("patientCount", patientCount.toString());
      setPatientCount(patientCount);

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
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
          {patients && (
            <Grid container spacing={3}>
              {patients.map((patient, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <PatientCard
                    patient={patient}
                    onUpdate={handleUpdatePatient}
                    onDelete={() => handleDeletePatient(patient.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
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
