import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for storing the image preview

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/product/get_product');
        const text = await response.text();  // Read the raw response as text
        console.log(text); // Log the raw response
    
        // Try to parse the response as JSON
        const data = JSON.parse(text);
        console.log(data); // Log the parsed data

        // Set products and change loading state
        setProducts(data.data);  // Assuming data.data contains the array of products
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);  // Stop loading if there's an error
      }
    };

    fetchProducts();
  }, []);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the image preview state
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar-containers">
        <h2 className="navbar-headings">Inventory</h2>
        <div className="navbar-link">
          <ul>
            <li>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
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
          <p className="product-titles">Product</p>
          <span className="total-product">{products.length} total products</span>
        </div>
        <div className="action">
          <div className="search-bars">
            <input type="text" placeholder="Search product..." />
            <button className="search-icons">🔍</button>
          </div>
          <button className="add-products" onClick={toggleModal}>
            Add Product
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/50"}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>{product.discription || "No description available"}</p>
                <p>{product.in_stock ? "In Stock" : "Out of Stock"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding Product */}
      {showModal && (
  <div className="custom-modal-overlay">
    <div className="custom-modal-container">
      <button className="custom-modal-close" onClick={toggleModal}>
        ✖
      </button>
      <div className="custom-modal-content">
        {/* Left Section */}
        <div className="custom-modal-left">
          <h2>Product Preview</h2>
          <div className="custom-product-image-container">
            <img
              src={imagePreview || "https://via.placeholder.com/150"} // Display the preview or default image
              alt="Product Preview"
              className="custom-product-image"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="custom-modal-right">
  <h2>Add Product</h2>
  <form>
    <div className="custom-form-group">
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Enter product name"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #242b37',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '10px',
        }}
      />
    </div>
    <div className="custom-form-group">
      <label>Category</label>
      <input
        type="text"
        placeholder="Enter category"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #242b37',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '10px',
        }}
      />
    </div>
    <div className="custom-form-group">
      <label>Stock Quantity</label>
      <input
        type="number"
        placeholder="Enter stock quantity"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #242b37',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '10px',
        }}
      />
    </div>
    <div className="custom-form-group">
      <label>Price</label>
      <input
        type="number"
        placeholder="Enter price"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #242b37',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '10px',
        }}
      />
    </div>
    <div className="custom-form-group">
      <label>Upload Image</label>
      <input
        type="file"
        onChange={handleImageChange}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #242b37',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '10px',
        }}
      />
    </div>
            <div className="custom-form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter product description"
                rows="4"
                className="custom-textarea"
              />
            </div>
            <button type="submit" className="custom-save-button">
              Save Product
            </button>
          </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
