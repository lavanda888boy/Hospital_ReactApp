import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <AppBar>
      <Toolbar className="navbar">
        <Typography variant="h4" component="div" className="navbar-app-name">
          Hospital Management
        </Typography>

        <div className="navbar-links">
          <Typography variant="h6">
            <RouterLink
              to="/Hospital_ReactApp/patients"
              className="navbar-link"
            >
              Patients
            </RouterLink>
          </Typography>

          <Typography variant="h6">
            <RouterLink to="/Hospital_ReactApp/records" className="navbar-link">
              Records
            </RouterLink>
          </Typography>

          <Typography variant="h6">
            <RouterLink to="/Hospital_ReactApp/" className="navbar-link">
              Cabinet
            </RouterLink>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
