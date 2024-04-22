import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <AppBar>
      <Toolbar className='navbar'>
        <Typography variant="h6" component="div" className='navbar-app-name'>
          Hospital Management
        </Typography>

        <div className='navbar-links'>
          <Typography variant="h6"> 
            <RouterLink to="/Hospital_ReactApp/patients" className='navbar-link'> 
              Patients 
            </RouterLink>  
          </Typography>
          
          <Typography variant="h6"> 
            <RouterLink to="/Hospital_ReactApp/appointments" className='navbar-link'> 
              Appointments 
            </RouterLink>   
          </Typography>
          
          <Typography variant="h6"> 
            <RouterLink to="/Hospital_ReactApp/records" className='navbar-link'> 
              Records 
            </RouterLink>   
          </Typography>
        </div>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
