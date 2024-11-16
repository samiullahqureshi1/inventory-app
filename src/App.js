import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignup from './components/LoginSignup';
import Inventory from './components/inventory';
import './App.css';
import RawMaterial from './components/rawMaterial';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/dashboard" element={<Navbar />} />
          <Route path="/" element={<LoginSignup />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/raw-material" element={<RawMaterial />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
