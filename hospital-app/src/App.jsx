import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Hospital_ReactApp" element={ <Navbar/> } />
      </Routes>
    </Router>
  )
}

export default App
