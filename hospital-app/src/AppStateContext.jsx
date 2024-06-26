import React, { createContext, useContext, useState } from "react";

export const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [patientCount, setPatientCount] = useState(
    localStorage.getItem("patientCount") || 0
  );
  const [recordCount, setRecordCount] = useState(
    localStorage.getItem("recordCount") || 0
  );

  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);

  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  return (
    <AppStateContext.Provider
      value={{
        patientCount,
        setPatientCount,
        recordCount,
        setRecordCount,
        patients,
        setPatients,
        records,
        setRecords,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
