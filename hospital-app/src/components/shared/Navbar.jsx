import React from "react";
import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AppStateContext } from "../../AppStateContext";
import "./Navbar.css";
import LoginDialog from "../login/LoginDialog";

function Navbar() {
  const { patientCount, recordCount } = useContext(AppStateContext);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleLoginSubmit = async (role) => {
    try {
      const url = `https://localhost:7134/api/Auth?role=${role}`;
      const response = await fetch(url);

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);
        setShowLoginDialog(false);
      } else {
        console.error("Login request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

          <Typography variant="h6" className="navbar-count">
            ({patientCount})
          </Typography>

          <Typography variant="h6">
            <RouterLink to="/Hospital_ReactApp/records" className="navbar-link">
              Records
            </RouterLink>
          </Typography>

          <Typography variant="h6" className="navbar-count">
            ({recordCount})
          </Typography>

          <Typography variant="h6">
            <RouterLink to="/Hospital_ReactApp/" className="navbar-link">
              Cabinet
            </RouterLink>
          </Typography>

          <button
            className="navbar-login"
            onClick={() => setShowLoginDialog(true)}
          >
            <Typography variant="h6">Login</Typography>
          </button>
        </div>
      </Toolbar>

      <LoginDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSubmit={handleLoginSubmit}
      />
    </AppBar>
  );
}

export default Navbar;
