import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './reset.css'
import Patients from './pages/Patients';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Hospital_ReactApp/patients" element={ <Patients/> } />
      </Routes>
    </Router>
  )
}

export default App
