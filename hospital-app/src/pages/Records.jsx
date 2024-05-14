import React, { useEffect, useContext, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import "./Records.css";
import AddRecordDialog from "../components/records/AddRecordDialog";
import RecordCard from "../components/records/RecordCard";
import { AppStateContext } from "../AppStateContext";

const Records = () => {
  const { recordCount, setRecordCount, records, setRecords } =
    useContext(AppStateContext);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(storedRecords);
  }, [setRecords]);

  function saveRecordsToLocalStorage(recordsData) {
    localStorage.setItem("records", JSON.stringify(recordsData));
  }

  function getRecordCountFromLocalStorage() {
    const count = localStorage.getItem("recordCount");
    return count ? parseInt(count, 10) : 0;
  }

  function handleAddRecord(newRecord) {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    saveRecordsToLocalStorage(updatedRecords);

    const recordCount = getRecordCountFromLocalStorage() + 1;
    localStorage.setItem("recordCount", recordCount.toString());

    setRecordCount(recordCount);

    setOpenDialog(false);
  }

  function handleDeleteRecord(deleteRecord) {
    const updatedRecords = records.filter(
      (record) =>
        record.date !== deleteRecord.date ||
        record.doctor !== deleteRecord.doctor ||
        record.patient !== deleteRecord.patient ||
        record.notes !== deleteRecord.notes
    );
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));

    const recordCount = getRecordCountFromLocalStorage() - 1;
    localStorage.setItem("recordCount", recordCount.toString());

    setRecordCount(recordCount);
  }

  return (
    <>
      <div className="records-wrapper">
        <Container>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            className="records-add-button"
          >
            Add Record
          </Button>
          <Grid container spacing={3}>
            {records &&
              records.map((record, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <RecordCard record={record} onDelete={handleDeleteRecord} />
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
