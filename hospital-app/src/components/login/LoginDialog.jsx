import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./LoginDialog.css";

function LoginDialog({ open, onClose, onSubmit }) {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(role);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="login-dialog">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth className="login-dialog-input">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button
                onClick={onClose}
                variant="contained"
                color="primary"
                className="login-dialog-submit"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="login-dialog-cancel"
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default LoginDialog;
