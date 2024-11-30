import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Monthly = () => {
  const [products, setProducts] = useState([]); // Orders
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0); // Total sales value
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null); // Track active product for options
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch weekly sales data
  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const response = await fetch("https://inventory-app-b.vercel.app/product/getMonthlySales");
        if (!response.ok) {
          throw new Error("Failed to fetch monthly sales.");
        }

        const data = await response.json();
        setProducts(data.orders || []);
        setTotalSales(data.totalSales || 0); // Update total sales
        setLoading(false);
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
        setLoading(false);
      }
    };

    fetchWeeklySales();
  }, []);

  return (
    <div>
      {/* Navbar */}
      {alertMessage && <div className={`alert ${alertType}`}>{alertMessage}</div>}

      <div className="navbar-containers">
        <h2 className="navbar-headings">Inventory</h2>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>
        <div className={`navbar-link ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/inventory" style={{ color: "white", textDecoration: "none" }}>
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/raw-material" style={{ color: "white", textDecoration: "none" }}>
                Raw Material
              </Link>
            </li>
            <li>
              <Link to="/out-of-stock" style={{ color: "white", textDecoration: "none" }}>
                Out of Stock
              </Link>
            </li>
            <li>
              <Link to="/order-completed" style={{ color: "white", textDecoration: "none" }}>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/weekly-sales" style={{ color: "white", textDecoration: "none" }}>
                Sales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Sales</p>
          <span className="total-product">Total Sales: ฿{totalSales.toFixed(2)}</span>
          <Link to="/weekly-sales">
            <button className="new-button">Weekly</button>
          </Link>
          <Link to="/monthly-sales">
            <button className="new-button">Monthly</button>
          </Link>
          <Link to="/sales-history">
            <button className="new-button">History</button>
          </Link>
        </div>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading sales...</p>
        ) : products.length === 0 ? (
          <p>No sales history found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-details">
                <h3 className="product-name">{product.product || "Unnamed Product"}</h3>
                <div className="product-info">
                  <span className="product-quantity">Quantity: {product.quantity || 0}</span>
                  <span className="product-price">Total Price: ฿{product.totalPrice || 0}</span>
                  <span className="product-price">Status: {product.status || "Unknown"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Monthly;
