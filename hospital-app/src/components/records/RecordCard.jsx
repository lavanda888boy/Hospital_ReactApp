import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { AppStateContext } from "../../AppStateContext";
import "./RecordCard.css";
import UpdateRecordDialog from "./UpdateRecordDialog";

function RecordCard({ record, onDelete }) {
  const { userRole } = useContext(AppStateContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdate = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (updatedRecord) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7134/api/MedicalRecord/?id=${updatedRecord.id}&examinationNotes=${updatedRecord.examinationNotes}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update record");
      }

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("Failed to update record.");
    }
  };

  return (
    <Card style={{ borderRadius: "10px" }}>
      <CardHeader className="record-card-header" title={`${record.date}`} />
      <CardContent className="record-card-content">
        <div>
          <Typography style={{ fontSize: "0.95vw", textAlign: "justify" }}>
            Patient: {record.patient}
          </Typography>
          <Typography style={{ fontSize: "0.95vw", textAlign: "justify" }}>
            Doctor: {record.doctor}
          </Typography>
          <Typography style={{ fontSize: "0.95vw", textAlign: "justify" }}>
            Examination notes: {record.notes}
          </Typography>
        </div>
        {(userRole === "Admin" || userRole === "Doctor") && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            className="record-card-update"
          >
            Update
          </Button>
        )}
        {userRole === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onDelete(record)}
            className="record-card-remove"
          >
            Remove
          </Button>
        )}
      </CardContent>
      <UpdateRecordDialog
        open={openDialog}
        onClose={handleClose}
        onSubmit={handleSubmit}
        record={record}
      />
    </Card>
  );
}

export default RecordCard;
