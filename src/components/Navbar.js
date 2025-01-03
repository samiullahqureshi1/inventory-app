

import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Navbar.css"; // Import CSS file for styling
import InfiniteScroll from "react-infinite-scroll-component";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
  const [totalRaw, setTotalRaw] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  // State to manage displayed products
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://inventory-app-b.vercel.app/product/get_product');
        const text = await response.text();
        console.log(text);

        const data = JSON.parse(text);
        console.log(data);

        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await fetch('https://inventory-app-b.vercel.app/product/getAllSlaes'); // Replace with your API endpoint
        const data = await response.json();
        if (data?.totalSales !== undefined) {
          setTotalSales(data.totalSales);
        } else {
          console.error('Invalid response:', data);
        }
      } catch (error) {
        console.error('Error fetching total sales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, []);


  useEffect(() => {
    const fetchTotalDeliveredOrders = async () => {
      try {
        const response = await fetch("https://inventory-app-b.vercel.app/product/getTotalOrders"); // Update with your API endpoint
        const data = await response.json();

        if (response.ok) {
          setTotalDeliveredOrders(data.totalOrders);
        } else {
          console.error("Failed to fetch total delivered orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching total delivered orders:", error);
      }
    };

    fetchTotalDeliveredOrders();
  }, []);

  useEffect(() => {
    const fetchTotalRaw = async () => {
      try {
        const response = await fetch("https://inventory-app-b.vercel.app/product/getAllRawMaterial"); // Update with your API endpoint
        const data = await response.json();

        if (response.ok) {
          setTotalRaw(data.totalOrders);
        } else {
          console.error("Failed to fetch total delivered orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching total delivered orders:", error);
      }
    };

    fetchTotalRaw();
  }, []);

  useEffect(() => {
    const fetchTotalInventory = async () => {
      try {
        const response = await fetch("https://inventory-app-b.vercel.app/product/getTotalInventory"); // Update with your API endpoint
        const data = await response.json();

        if (response.ok) {
          setTotalInventory(data.totalOrders);
        } else {
          console.error("Failed to fetch total delivered orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching total delivered orders:", error);
      }
    };

    fetchTotalInventory();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar-containers">
      <h2 className="navbar-headings">Inventory</h2>
      <div className="hamburger" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`navbar-link ${isOpen ? 'open' : ''}`}>
        <ul>
        <li>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
            </li>
            <li>
              <Link to="/raw-material" style={{ color: 'white', textDecoration: 'none' }}>Raw Material</Link>
            </li>
            <li>
              <Link to="/out-of-stock" style={{ color: 'white', textDecoration: 'none' }}>Out of Stock</Link>
            </li>
            <li>
              <Link to="/order-completed" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
            </li>
            <li>
              <Link to="/weekly-sales" style={{ color: 'white', textDecoration: 'none' }}>Sales</Link>
            </li>
            <li>
              <Link to="/employeement" style={{ color: 'white', textDecoration: 'none' }}>HR</Link>
            </li>
        </ul>
      </div>
    </div>

      {/* Dashboard Section */}
      
      <div className="dashboard-section">
        <p className="dashboard-text">Dashboard</p>
        <div className="buttons-container">
           <Link to="/epired">
                      <button className="action-btn" style={{fontSize:'10px'}}>Expired Product</button>
                    </Link>
          {/* <button className="action-btn">Contact Help</button>
          <button className="action-btn">Quick Action</button> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="stock-level-section">
          <h2 className="section-title">Stock Level</h2>
          <div className="stock-level-content">
            <div className="stock-chart">
              <div className="chart-circle">
                <p className="active-products">{totalInventory}</p>
                <p className="active-text">Active Product</p>
              </div>
            </div>
            <div className="stock-details">
              <p className="stock-type high-stock">HIGH STOCK PRODUCT</p>
              <div className="progress-bar high"></div>
              <p>1,200 products</p>
              <p className="stock-type near-low-stock">NEAR-LOW STOCK PRODUCT</p>
              <div className="progress-bar near-low"></div>
              <p>1,200 products</p>
              <p className="stock-type low-stock">LOW STOCK PRODUCT</p>
              <div className="progress-bar low"></div>
              <p>1,200 products</p>
              <p className="stock-type out-of-stock">OUT OF STOCK PRODUCT</p>
              <div className="progress-bar out"></div>
              <p>1,200 products</p>
            </div>
          </div>
        </div>

        {/* Best Selling Section */}
        <div className="best-selling-section">
          <div className="header">
            <h2 className="section-title">Best Selling Product</h2>
            <Link to="/inventory" className='view-more' style={{ color: 'green', textDecoration: 'none' }}>View More</Link> {/* Link to Dashboard */}
            </div>
          <InfiniteScroll
            dataLength={products.length}
            // next={fetchMoreProducts}
            hasMore={hasMore}
            loader={<h4 style={{ color: "white", textAlign: "center" }}></h4>}
            endMessage={<p style={{ color: "white", textAlign: "center" }}>No more products to display!</p>}
          >
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                  {/* <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                alt={product.product_name}
                className="product-image"
              /> */}
                <div className="product-details">
                  <h4 className="product-name">{product.product_name}</h4>
                  <p className="product-info">
                    {/* <span className="variant">{product.variants}</span> */}
                    <span className="product-description">{product.discription || "No description available"}</span>

                    <span className="category"> {product.category || 'no category available'}</span>
                    <span className="product-status">
                    <span style={{ color: product.in_stock ? "green" : "red" }}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </span>
                  <span className="product-quantity">Quantity: {product.quantity || 0}</span>
                  <span className="product-price">Price: ฿{product.price || "N/A"}</span>
                  <span className="product-price">ExpireAt:{new Date(product.expiry_date).toLocaleDateString()}</span>

                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>

      {/* Boxes Section */}
      <div className="dashboard-boxes">
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📦</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL PRODUCT IN INVENTORY</h3>
            <p className="box-value">{totalInventory}</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">🛒</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL RAW MATERIAL</h3>
            <p className="box-value">{totalRaw}</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📥</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL Sales</h3>
            <p className="box-value">฿:{totalSales.toFixed(2)}</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📤</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL Delivered Orders</h3>
            <p className="box-value">{totalDeliveredOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
