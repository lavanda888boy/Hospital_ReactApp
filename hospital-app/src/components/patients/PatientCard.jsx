import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import './PatientCard.css';

function PatientCard({ patient }) {
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
        </CardContent>
      </Card>
    );
};

export default PatientCard;