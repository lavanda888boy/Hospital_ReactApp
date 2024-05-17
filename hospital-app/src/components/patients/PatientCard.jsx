import React, { useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { AppStateContext } from "../../AppStateContext";
import "./PatientCard.css";

function PatientCard({ patient, onDelete }) {
  const { userRole } = useContext(AppStateContext);

  const handleUpdate = () => {
    onUpdate(patient);
  };

  const handleDelete = () => {
    onDelete(patient);
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
            onClick={handleDelete}
            className="patient-card-remove"
          >
            Remove
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default PatientCard;
