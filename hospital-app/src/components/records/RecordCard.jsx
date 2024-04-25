import React from 'react';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import './RecordCard.css';

function RecordCard({ record, onDelete }) {
  const handleDelete = () => {
    onDelete(record);
  };

  return (
    <Card style={{ 'border-radius': '10px' }}>
      <CardHeader className='record-card-header' title={`${record.date}`} />
      <CardContent className='record-card-content'>
        <div>
          <Typography style={{ 'fontSize': '0.95vw', 'text-align': 'justify' }}>
            Patient: {record.patient}
          </Typography>
          <Typography style={{ 'fontSize': '0.95vw', 'text-align': 'justify' }}>
            Doctor: {record.doctor}
          </Typography>
          <Typography style={{ 'fontSize': '0.95vw', 'text-align': 'justify'}}>
            Examination notes: {record.notes}
          </Typography>
        </div>
        <Button variant="contained" color="primary" onClick={handleDelete} className='record-card-remove'>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecordCard;