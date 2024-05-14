import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./reset.css";
import Patients from "./pages/Patients";
import Records from "./pages/Records";
import Cabinet from "./pages/Cabinet";
import { AppStateProvider } from "./AppStateContext";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <Navbar />
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
