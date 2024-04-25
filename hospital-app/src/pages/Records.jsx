import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Navbar from '../components/shared/Navbar';
import './Records.css';
import AddRecordDialog from '../components/records/AddRecordDialog';
import RecordCard from '../components/records/RecordCard';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const saveRecordsToLocalStorage = (recordsData) => {
    localStorage.setItem('records', JSON.stringify(recordsData));
  };

  const getRecordsFromLocalStorage = () => {
    const recordsData = localStorage.getItem('records');
    return recordsData ? JSON.parse(recordsData) : [];
  };

  useEffect(() => {
    const storedRecords = getRecordsFromLocalStorage();
    
    if (storedRecords.length === 0) {
      const defaultRecords = [];
      saveRecordsToLocalStorage(defaultRecords);
    }

    setRecords(storedRecords);
  }, []);

  function handleAddRecord(newRecord) {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    saveRecordsToLocalStorage(updatedRecords);
    setOpenDialog(false);
  };

  function handleDeleteRecord(deleteRecord) {
    const updatedRecords = records.filter(record => record.date !== deleteRecord.date ||
        record.doctor !== deleteRecord.doctor || record.patient !== deleteRecord.patient ||
        record.notes !== deleteRecord.notes);
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  return (
    <>
      <Navbar />
        <div className='records-wrapper'>
          <Container>
            <Button variant="contained" onClick={() => setOpenDialog(true)} className='records-add-button'>
              Add Record
            </Button>
            <Grid container spacing={3}>
              {records.map((record, index) => (
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
}

export default Records;