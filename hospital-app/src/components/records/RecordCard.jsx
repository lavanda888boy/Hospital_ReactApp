import React from 'react';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import './RecordCard.css';

function RecordCard({ record, onDelete }) {
  const handleDelete = () => {
    onDelete(record.id);
  };

  return (
    <Card style={{ 'border-radius': '10px' }}>
      <CardHeader className='patient-card-header' title={`${patient.name}`} />
      <CardContent className='patient-card-content'>
        <Typography style={{ 'fontSize': '0.95vw', 'marginBottom': '1%' }}>
          Age: {patient.age}, Gender: {patient.gender}
        </Typography>
        <Typography component="div" className='patient-card-diseases'>
          Diagnosed Diseases: 
          <ul>
            {patient.diagnosedDiseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDelete} className='patient-card-remove'>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientCard;