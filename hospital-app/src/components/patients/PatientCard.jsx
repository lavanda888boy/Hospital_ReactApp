import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { AppStateContext } from "../../AppStateContext";
import UpdatePatientDialog from "./UpdatePatientDialog"; // Make sure the path is correct
import "./PatientCard.css";

function PatientCard({ patient, onDelete, onUpdate }) {
  const { userRole } = useContext(AppStateContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdate = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (updatedPatient) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7134/api/Patient/?id=${updatedPatient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update patient");
      }

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient. Please try again.");
    }
  };

  return (
    <Card style={{ borderRadius: "10px" }}>
      <CardHeader className="patient-card-header" title={`${patient.name}`} />
      <CardContent className="patient-card-content">
        <Typography style={{ fontSize: "0.95vw", marginBottom: "1%" }}>
          Age: {patient.age}, Gender: {patient.gender}
        </Typography>
        <Typography component="div" className="patient-card-diseases">
          Diagnosed Diseases:
          <ul>
            {patient.illnesses?.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </Typography>
        {userRole === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            className="patient-card-update"
          >
            Update
          </Button>
        )}
        {userRole === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onDelete(patient)}
            className="patient-card-remove"
          >
            Remove
          </Button>
        )}
      </CardContent>
      <UpdatePatientDialog
        open={openDialog}
        onClose={handleClose}
        onSubmit={handleSubmit}
        patient={patient}
      />
    </Card>
  );
}

export default PatientCard;
