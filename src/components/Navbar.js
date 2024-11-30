

import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Navbar.css"; // Import CSS file for styling
import InfiniteScroll from "react-infinite-scroll-component";

const Navbar = () => {
  const [loading, setLoading] = useState(true);


  // State to manage displayed products
  const [products, setProducts] = useState([]);

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
  

  return (
    <div>
      {/* Navbar */}
      <div className="navbar-container">
        <h2 className="navbar-heading">Inventar</h2>
        <div className="navbar-links">
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
<li>
              <Link to="/out-of-stock" style={{ color: 'white', textDecoration: 'none' }}>Out of Stock</Link>
            </li>
            <li>
              <Link to="/order-completed" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-section">
        <p className="dashboard-text">Dashboard</p>
        <div className="buttons-container">
          <button className="action-btn">Contact Help</button>
          <button className="action-btn">Quick Action</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="stock-level-section">
          <h2 className="section-title">Stock Level</h2>
          <div className="stock-level-content">
            <div className="stock-chart">
              <div className="chart-circle">
                <p className="active-products">8,572</p>
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
            loader={<h4 style={{ color: "white", textAlign: "center" }}>Loading...</h4>}
            endMessage={<p style={{ color: "white", textAlign: "center" }}>No more products to display!</p>}
          >
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                  <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                alt={product.product_name}
                className="product-image"
              />
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
                  <span className="product-price">Price: ${product.price || "N/A"}</span>
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
            <p className="box-value">10,226</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">🛒</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL RAW MATERIAL</h3>
            <p className="box-value">2,000,508</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📥</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL OUT OF STOCK PRODUCT</h3>
            <p className="box-value">5,680</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📤</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL HIGH STOCK PRODUCT</h3>
            <p className="box-value">878</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
