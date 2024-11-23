import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Navbar.css"; // Import CSS file for styling
import InfiniteScroll from "react-infinite-scroll-component";

const Navbar = () => {
  const allProducts = [
    { id: 1, title: "Adidas ORKETRO SHOES Blue 36", variants: "6 variants", category: "Man Shoes", stock: "120 in stock", img: "https://via.placeholder.com/50" },
    { id: 2, title: "Adidas ULTRABOOST 1.0 DNA Running Speed", variants: "6 variants", category: "Man Shoes", stock: "820 in stock", img: "https://via.placeholder.com/50" },
    { id: 3, title: "Adidas ADICOLOR SST TRACK JACKET", variants: "6 variants", category: "Man Shoes", stock: "120 in stock", img: "https://via.placeholder.com/50" },
    { id: 4, title: "Adidas Stan Smith Sneakers", variants: "4 variants", category: "Unisex Shoes", stock: "200 in stock", img: "https://via.placeholder.com/50" },
    { id: 5, title: "Nike Air Max 270", variants: "5 variants", category: "Man Shoes", stock: "150 in stock", img: "https://via.placeholder.com/50" },
    { id: 6, title: "Puma RS-X Bold", variants: "3 variants", category: "Unisex Shoes", stock: "300 in stock", img: "https://via.placeholder.com/50" },
    { id: 7, title: "Reebok Club C 85", variants: "2 variants", category: "Man Shoes", stock: "100 in stock", img: "https://via.placeholder.com/50" },
    { id: 8, title: "Adidas ZX 2K Boost", variants: "4 variants", category: "Man Shoes", stock: "180 in stock", img: "https://via.placeholder.com/50" },
  ];

  // State to manage displayed products
  const [products, setProducts] = useState(allProducts.slice(0, 3)); // Initially display 3 products
  const [hasMore, setHasMore] = useState(true);

  // Function to load more products
  const fetchMoreProducts = () => {
    if (products.length >= allProducts.length) {
      setHasMore(false); // Stop fetching if no more products
      return;
    }

    // Simulate loading more products (add 3 more at a time)
    const nextProducts = allProducts.slice(products.length, products.length + 3);
    setProducts([...products, ...nextProducts]);
  };

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
            next={fetchMoreProducts}
            hasMore={hasMore}
            loader={<h4 style={{ color: "white", textAlign: "center" }}>Loading...</h4>}
            endMessage={<p style={{ color: "white", textAlign: "center" }}>No more products to display!</p>}
          >
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.img} alt={product.title} className="product-image" />
                <div className="product-detailss">
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-info">
                    <span className="variant">{product.variants}</span>
                    <span className="category">• {product.category}</span>
                    <span className="stock">• {product.stock}</span>
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
            <h3 className="box-title">TOTAL QUANTITY ON HAND</h3>
            <p className="box-value">2,000,508</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📥</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL PRODUCT TO BE RECEIVED</h3>
            <p className="box-value">5,680</p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <span className="box-icon">📤</span>
            <span className="box-percentage">10.5%</span>
          </div>
          <div className="box-body">
            <h3 className="box-title">TOTAL BE PACKED</h3>
            <p className="box-value">878</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
