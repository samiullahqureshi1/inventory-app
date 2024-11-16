import React, { useState, useEffect } from "react";
import "./material.css";
import { Link } from "react-router-dom";

const RawMaterial = () => {
  const [products, setProducts] = useState([]);
  

  return (
    <div>
      {/* Navbar */}
      <div className="navbar-containers">
        <h2 className="navbar-headings">Inventory</h2>
        <div className="navbar-link">
        <ul>
            <li>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link> {/* Link to Dashboard */}
            </li>
            <li>
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link> {/* Link to Inventory */}
            </li>
            <li>
  <Link to="/raw-material" style={{ color: 'white', textDecoration: 'none' }}>
    Raw Material
  </Link>
</li>

          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Raw Material</p>
          <span className="total-product">{products.length} total products</span>
        </div>
      </div>

    </div>
  );
};

export default RawMaterial;
