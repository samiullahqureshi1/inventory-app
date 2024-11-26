import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignup from './components/LoginSignup';
import Inventory from './components/inventory';
import './App.css';
import RawMaterial from './components/rawMaterial';
import OutStock from './components/OutOfStock';
import Sales from './components/Sales';
import OrderForm from './components/Addorder';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/dashboard" element={<Navbar />} />
          <Route path="/" element={<LoginSignup />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/raw-material" element={<RawMaterial />} />
          <Route path="/out-of-stock" element={<OutStock />} />
          <Route path="/out-of-stock" element={<OutStock />} />
          <Route path="/order" element={<Sales />} />
          <Route path="/add-order" element={<OrderForm />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
