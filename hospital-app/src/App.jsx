import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './reset.css'
import Patients from './pages/Patients';
import Records from './pages/Records';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Hospital_ReactApp/patients" element={ <Patients/> } />
        <Route path="/Hospital_ReactApp/records" element={ <Records/> } />
      </Routes>
    </Router>
  )
}

export default App
