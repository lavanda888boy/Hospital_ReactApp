import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./reset.css";
import Patients from "./pages/Patients";
import Records from "./pages/Records";
import Cabinet from "./pages/Cabinet";
import { AppStateProvider } from "./AppStateContext";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <Routes>
          <Route path="/Hospital_ReactApp/patients" element={<Patients />} />
          <Route path="/Hospital_ReactApp/records" element={<Records />} />
          <Route path="/Hospital_ReactApp/" element={<Cabinet />} />
        </Routes>
      </Router>
    </AppStateProvider>
  );
}

export default App;
