import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./UpdateRecordDialog.css";

function UpdateRecordDialog({ open, onClose, onSubmit, record }) {
  const [examinationNotes, setExaminationNotes] = useState("");

  useEffect(() => {
    if (record) {
      setExaminationNotes(record.examinationNotes || "");
    }
  }, [record]);

  const handleSubmit = () => {
    if (!examinationNotes) {
      alert("Please fill out the Examination Notes field");
      return;
    }

    const updatedRecord = {
      ...record,
      examinationNotes,
    };

    onSubmit(updatedRecord);

    setExaminationNotes("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="records-update-dialog">
        <DialogTitle style={{ marginBottom: "-2%" }}>
          Update Examination Notes
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Examination Notes"
            value={examinationNotes}
            onChange={(e) => setExaminationNotes(e.target.value)}
            fullWidth
            multiline
            rows={4}
            className="records-update-dialog-row"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="records-update-dialog-submit"
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            className="records-update-dialog-cancel"
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default UpdateRecordDialog;
