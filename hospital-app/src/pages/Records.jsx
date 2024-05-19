import React, { useEffect, useContext, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import "./Records.css";
import AddRecordDialog from "../components/records/AddRecordDialog";
import RecordCard from "../components/records/RecordCard";
import { AppStateContext } from "../AppStateContext";

const Records = () => {
  const { recordCount, setRecordCount, records, setRecords, userRole } =
    useContext(AppStateContext);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchRecords() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://localhost:7134/api/MedicalRecord",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setRecords(data);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    }

    fetchRecords();
  }, [setRecords]);

  function getRecordCountFromLocalStorage() {
    const count = localStorage.getItem("recordCount");
    return count ? parseInt(count, 10) : 0;
  }

  async function handleAddRecord(newRecord) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://localhost:7134/api/MedicalRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRecord),
      });
      console.log(newRecord);
      if (!response.ok) {
        throw new Error("Failed to add record");
      }

      const recordCount = getRecordCountFromLocalStorage() + 1;
      localStorage.setItem("recordCount", recordCount.toString());
      setRecordCount(recordCount);

      window.location.reload();
    } catch (error) {
      console.error("Failed to add record:", error);
      alert("Failed to add record.");
    }
  }

  async function handleDeleteRecord(deleteRecordId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://localhost:7134/api/MedicalRecord?id=${deleteRecordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete record");
      }

      let recordCount = getRecordCountFromLocalStorage() - 1;
      recordCount = recordCount >= 0 ? recordCount : 0;
      localStorage.setItem("recordCount", recordCount.toString());
      setRecordCount(recordCount);

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete record:", error);
      alert("Failed to delete record.");
    }
  }

  return (
    <>
      <div className="records-wrapper">
        <Container>
          {(userRole === "Admin" || userRole === "Doctor") && (
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              className="records-add-button"
            >
              Add Record
            </Button>
          )}
          <Grid container spacing={3}>
            {records &&
              records.map((record, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <RecordCard
                    record={record}
                    onDelete={() => handleDeleteRecord(record.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
      <AddRecordDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddRecord}
      />
    </>
  );
};

export default Records;
