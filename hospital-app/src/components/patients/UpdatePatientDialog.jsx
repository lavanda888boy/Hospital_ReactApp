import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./UpdatePatientDialog.css";

function UpdatePatientDialog({ open, onClose, onSubmit, patient }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosedDiseases, setDiagnosedDiseases] = useState("");

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setDiagnosedDiseases(patient.illnesses.join(", "));
    }
  }, [patient]);

  const handleSubmit = () => {
    if (!name || !age || age < 1 || !gender || !diagnosedDiseases) {
      alert("Please fill out all fields or validate the data");
      return;
    }

    const updatedPatient = {
      ...patient,
      name,
      age: parseInt(age),
      gender,
      diagnosedDiseases: diagnosedDiseases
        .split(",")
        .map((disease) => disease.trim()),
    };

    onSubmit(updatedPatient);

    setName("");
    setAge("");
    setGender("");
    setDiagnosedDiseases("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="patients-update-dialog">
        <DialogTitle style={{ marginBottom: "-2%" }}>
          Update Patient
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            className="patients-update-dialog-row"
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            className="patients-update-dialog-row"
          />
          <TextField
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            className="patients-update-dialog-row"
          />
          <TextField
            label="Diagnosed Diseases (comma-separated)"
            value={diagnosedDiseases}
            onChange={(e) => setDiagnosedDiseases(e.target.value)}
            fullWidth
            className="patients-update-dialog-row"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="patients-update-dialog-submit"
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            className="patients-update-dialog-cancel"
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default UpdatePatientDialog;
